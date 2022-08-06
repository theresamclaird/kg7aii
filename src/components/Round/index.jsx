import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Station from "../Station";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  }
}));

const Round = ({ number, stations, allowHideStations = false, removeStation }) => {
  const classes = useStyles();
  const [showStations, setShowStations] = useState(true);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small" aria-label="nets table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={10} className={classes.tableHead}>
                  {allowHideStations && (
                    <IconButton
                      style={{ color: "white" }}
                      size="small"
                      onClick={() => setShowStations(!showStations)}
                    >
                      {showStations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
                  Round {number} ({stations.length}{" "}
                  {stations.length === 1 ? "station" : "stations"})
                </TableCell>
              </TableRow>
            </TableHead>
            {showStations && (
              <TableBody>
                {stations.map((station, index) => (
                  <Station station={station} removeStation={() => removeStation(index)} />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Round;