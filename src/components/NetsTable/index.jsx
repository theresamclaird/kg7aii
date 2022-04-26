import React from "react";
import { Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  }
}));

export default ({ items = [], removeItem = () => {} }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="nets table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>Net Controller</TableCell>
            <TableCell align="right" className={classes.tableHead}>
              Start
            </TableCell>
            <TableCell align="right" className={classes.tableHead}>
              End
            </TableCell>
            <TableCell align="right" className={classes.tableHead}>
              Rounds
            </TableCell>
            <TableCell className={classes.tableHead}>Remove</TableCell>
          </TableRow>
        </TableHead>
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
};
