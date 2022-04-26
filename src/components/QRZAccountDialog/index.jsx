import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { QRZSessionContext } from "../QRZSession";
import LinearProgress from "@material-ui/core/LinearProgress";

const QrzAccountDialog = ({ open, handleClose }) => {
  const { loading, error, setCredentials } = useContext(QRZSessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">QRZ Account</DialogTitle>
      <DialogContent>
        {loading && <LinearProgress />}
        <DialogContentText>
          Log into QRZ to automatically populate name & location.
        </DialogContentText>
        {error && <DialogContentText>{error.message}</DialogContentText>}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => setCredentials({ username, password })}
          color="primary"
        >
          Authenticate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QrzAccountDialog;
