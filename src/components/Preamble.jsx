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
      <DialogTitle>Preamble</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>{`Good morning; it is ${today.getHours()}:${today.getMinutes()} and time for Saturday Morning 9:00 Net for ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}.`}</DialogContentText>
        <DialogContentText mb={2}>My name is Dana, and my call sign is KG7CGP.</DialogContentText>
        <DialogContentText mb={2}>My name is Theresa, and my call sign is KG7AII.</DialogContentText>
        <DialogContentText mb={2}>This is a directed social net that happens on the PSRG repeater which is located on Capitol Hill in Seattle. The repeater operates on a frequency of 146.960 MHz with a negative offset and a PL tone of 103.5. All licensed hams and new licensees just getting started are welcome to join. If you have 3rd party traffic we would like to hear from them, too. We encourage you to press that button and tell us a little bit about yourself, your radio projects, or just about anything else.</DialogContentText>
        <DialogContentText mb={2}>Please limit your reports to three minutes so we can get as many stations in as possible. This is also when the repeater times out. When you are finished with your report, please end with your call sign; that will keep the FCC happy.</DialogContentText>
        <DialogContentText mb={2}>We will be compiling several rounds of stations during the net. After building each round we will ask each station consecutively for reports. If you would like to check-in only, just let us know you will be "in and out", also known as an I/O.</DialogContentText>
        <DialogContentText mb={2}>My name is Dana, and my call sign is KG7CGP.</DialogContentText>
        <DialogContentText mb={2}>My name is Theresa, and my call sign is KG7AII.</DialogContentText>
        <DialogContentText>Let’s get this net started. Please, come ahead now with your call sign and name for round 1.</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptsDialog;
