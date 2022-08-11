import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { QRZSessionContext } from "../QRZSession";
import LinearProgress from "@mui/material/LinearProgress";

const QrzAccountDialog = ({ open, handleClose }) => {
  const { loading, error, setCredentials } = useContext(QRZSessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(true);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle>QRZ Account</DialogTitle>
      <DialogContent>
        {loading && <LinearProgress />}
        {error && <DialogContentText>{error.message}</DialogContentText>}
        <DialogContentText>Log into QRZ to automatically populate name & location.</DialogContentText>
        <FormGroup>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox value={staySignedIn} onChange={e => setStaySignedIn(e.target.value)} />}
            label="Stay signed in"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setCredentials({ username, password });
            handleClose();
          }}
          color="primary"
        >
          Authenticate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QrzAccountDialog;
