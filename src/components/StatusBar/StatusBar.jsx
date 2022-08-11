import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import QRZAccountDialog from '../QRZAccountDialog';

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
  const [openQrzAccountDialog, setOpenQrzAccountDialog] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => timeRef.current.innerText = getCurrentTime(), 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ref={timeRef}>{getCurrentTime()}</Typography>
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