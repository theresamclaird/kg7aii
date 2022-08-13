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
    const intervalId = setInterval(() => {
      timeRef.current.innerText = getCurrentTime();
      stopwatchRef.current.innerText = new Date(Date.now() - stopwatchStartTime).toISOString().slice(11, 19);
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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ mr: 2 }}
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
          <Typography variant="h6" component="div" ref={stopwatchRef} />
          <Button
            onClick={() => setStopwatchStartTime(Date.now())}
            variant="contained"
            color="primary"
            size="small"
          >Reset</Button>
        </Box>
        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};
  
export default StatusBar;