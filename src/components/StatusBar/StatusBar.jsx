import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import QRZAccountDialog from '../QRZAccountDialog';
import { Preamble, Closing } from '../ScriptsDialog';

const getCurrentTime = () => {
  const daysInYear = year => ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
  const now = new Date();
  const currentYear = new Date().getFullYear();
  const start = new Date(currentYear, 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  const daysInCurrentYear = daysInYear(currentYear);
  return `${now.toLocaleString()} (${day} / ${daysInCurrentYear} = ${Math.floor(100 * day / daysInCurrentYear)}%)`;
};

const StatusBar = () => {
  const timeRef = useRef();
  const stopwatchRef = useRef();
  const [stopwatchStartTime, setStopwatchStartTime] = useState(Date.now())
  const [openQrzAccountDialog, setOpenQrzAccountDialog] = useState(false);
  const [openPreambleDialog, setOpenPreambleDialog] = useState(false);
  const [openClosingDialog, setOpenClosingDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const pad = i => ('0' + i).slice(-2);
    const intervalId = setInterval(() => {
      timeRef.current.innerText = getCurrentTime();
      const elapsed = new Date(Date.now() - stopwatchStartTime);
      const minutes = elapsed.getUTCMinutes();
      stopwatchRef.current.innerText = `${pad(elapsed.getUTCHours())}:${pad(minutes)}:${pad(elapsed.getUTCSeconds())}`;
      if (minutes > 1) {
        stopwatchRef.current.style.color = 'white';
        stopwatchRef.current.style.backgroundColor = 'red';
      }
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ref={timeRef}>{getCurrentTime()}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem'
          }}>
          <Typography variant="h6" component="div" ref={stopwatchRef} sx={{ px: 1, border: 'solid 1px #000', borderRadius: '1rem' }}>00:00:00</Typography>
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