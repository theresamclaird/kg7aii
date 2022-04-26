import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { PersistentItemsProvider } from "./components/PersistentItemsProvider";
import { QRZSessionProvider } from "./components/QRZSession";
import Netlogs from "./components/Netlogs";
import QRZAccountDialog from "./components/QRZAccountDialog";

import "./styles.css";

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

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <PersistentItemsProvider localStorageKey="nets">
      <QRZSessionProvider>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  KG7AII
                </Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Netlogs />
          </Grid>
        </Grid>
      </QRZSessionProvider>
    </PersistentItemsProvider>
  );
}
