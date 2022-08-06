import React, { useRef, useEffect, useState, useStyles } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import QRZAccountDialog from '../QRZAccountDialog';

const StatusBar = props => {
    const timeRef = useRef();
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1
        },
        menuButton: {
          marginRight: theme.spacing(2)
        },
        title: {
          flexGrow: 1
        }
      }));
      
    const classes = useStyles();

    useEffect(() => {
      const intervalId = setInterval(() => {
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 0);
          const diff = now - start;
          const oneDay = 1000 * 60 * 60 * 24;
          const day = Math.floor(diff / oneDay);
          timeRef.current.innerText = `${now.toLocaleString()} (day ${day}, ${Math.floor(100 * day/365)}%)`;
      }, 1000);
      return () => clearInterval(intervalId);
    });
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} ref={timeRef} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpen(true)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <QRZAccountDialog open={open} handleClose={() => setOpen(false)} />
        </Toolbar>
      </AppBar>
    );
};
  
export default StatusBar;