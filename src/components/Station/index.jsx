import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";

export default ({ station }) => {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <TableRow key={station.guid}>
        <TableCell onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </TableCell>
        <TableCell>{station.callsign}</TableCell>
        <TableCell>{station.name}</TableCell>
        <TableCell>{station.location}</TableCell>
        <TableCell>{station.inAndOut && <>🔃</>}</TableCell>
        <TableCell>{station.mobile && <>🚗</>}</TableCell>
        <TableCell>{station.internet && <>🌐</>}</TableCell>
        <TableCell>{station.recheck && <>📢</>}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => console.log("todo: delete station")}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {showNotes && (
        <TableRow key={`${station.guid}-notes`}>
          <TableCell colSpan={9} fullWidth={true}>
            <TextField
              label={`📝 ${station.callsign}`}
              fullWidth
              multiline
              margin="normal"
              rowsMax={10}
              InputLabelProps={{
                shrink: true
              }}
              variant="filled"
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
