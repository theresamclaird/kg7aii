import React from "react";
import { Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

const NetsTable = ({ items = [], removeItem = () => {} }) => (
  <TableContainer component={Paper} style={{ backgroundColor: 'red' }}>
    <Table size="small" aria-label="nets table">
      <TableBody>
        {items.map((net) => (
          <TableRow key={net.guid}>
            <TableCell>{net.host}</TableCell>
            <TableCell align="right">{net.start}</TableCell>
            <TableCell align="right">{net.end}</TableCell>
            <TableCell align="right">{net.rounds.length}</TableCell>
            <TableCell>
              <IconButton onClick={() => removeItem(net)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default NetsTable;