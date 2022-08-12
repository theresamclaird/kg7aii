import React from "react";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

const ScriptsDialog = ({ open, handleClose }) => {
  const today = new Date();
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="scripts-dialog-title">
      <DialogTitle>Closing</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>Thank you all for joining us for this Saturday morning 9:00 Net. I would like to thank the Puget Sound Repeater Group for the use of this repeater. For more information about the group, please visit our website at psrg.org.</DialogContentText>
        <DialogContentText mb={2}>Stick around for the Noon Net coming up in just a while, and of course the 9:00 net tonight with Schevonne. The PSRG has been hosting daily nets for over 30 years. The nets are a great opportunity to test your equipment! Remember, if you do not test your equipment, we can not hear you.</DialogContentText>
        <DialogContentText mb={2}>I will now return the repeater to normal operation.</DialogContentText>
        <DialogContentText mb={2}>This is Dana, and my call sign is KG7CGP.</DialogContentText>
        <DialogContentText mb={2}>This is Theresa, and my call sign is KG7AII.</DialogContentText>
        <DialogContentText>{`We are signing off at ${today.getHours()}:${today.getMinutes()}.`}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptsDialog;
