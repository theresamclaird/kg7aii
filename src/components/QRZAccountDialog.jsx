import React, { useContext, useState } from "react";
import {
  Button,
  FormGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { QRZSessionContext } from "./QRZSession";

const QrzAccountDialog = ({ open, handleClose }) => {
  const { error, setCredentials } = useContext(QRZSessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle>QRZ</DialogTitle>
      <DialogContent>
        {error && <DialogContentText>{error.message}</DialogContentText>}
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
