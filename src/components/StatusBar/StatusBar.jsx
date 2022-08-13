import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import QRZAccountDialog from '../QRZAccountDialog';
import { Preamble, Closing } from '../ScriptsDialog';

const currentTime = () => new Date().toLocaleString(Navigator?.languages?.[0] || 'en-US', { hour12: false });

const StatusBar = () => {
  const timeRef = useRef();
  const stopwatchRef = useRef();
  const [stopwatchStartTime, setStopwatchStartTime] = useState(Date.now())
  const [openQrzAccountDialog, setOpenQrzAccountDialog] = useState(false);
  const [openPreambleDialog, setOpenPreambleDialog] = useState(false);
  const [openClosingDialog, setOpenClosingDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    stopwatchRef.current.innerText = '00:00:00';
    const pad = i => ('0' + i).slice(-2);
    const intervalId = setInterval(() => {
      timeRef.current.innerText = currentTime();
      const elapsed = new Date(Date.now() - stopwatchStartTime);
      const minutes = elapsed.getUTCMinutes();
      stopwatchRef.current.innerText = `${pad(elapsed.getUTCHours())}:${pad(minutes)}:${pad(elapsed.getUTCSeconds())}`;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [stopwatchStartTime]);

  const handleMenu = e => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setOpenPreambleDialog(false);
    setOpenClosingDialog(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setOpenPreambleDialog(true)}>Preamble</MenuItem>
          <MenuItem onClick={() => setOpenClosingDialog(true)}>Closing</MenuItem>
          <Preamble open={openPreambleDialog} handleClose={handleClose} />
          <Closing open={openClosingDialog} handleClose={handleClose} />
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ref={timeRef}>{currentTime()}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem'
          }}>
          <Typography variant="h6" ref={stopwatchRef} />
          <Button
            onClick={() => setStopwatchStartTime(Date.now())}
            variant="contained"
            color="primary"
            size="small"
          >Reset</Button>
        </Box>
        <IconButton
          size="large"
          aria-label="qrz account"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setOpenQrzAccountDialog(true)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <QRZAccountDialog open={openQrzAccountDialog} handleClose={() => setOpenQrzAccountDialog(false)} />
      </Toolbar>
    </AppBar>
  );
};
  
export default StatusBar;