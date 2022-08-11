import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Station from "../Station";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  }
}));

const Round = ({ number, stations, allowHideStations = false, removeStation, updateStation }) => {
  const classes = useStyles();
  const [showStations, setShowStations] = useState(true);

  return (
    <Grid container component={Paper}>
      <Grid item xs={12} className={classes.tableHead} style={{
        display: 'flex',
        flexDirection: 'row',
        borderTopLeftRadius: '0.25rem',
        borderTopRightRadius: '0.25rem',
      }}>
        {allowHideStations && (
          <IconButton
            style={{ color: "white" }}
            size="small"
            onClick={() => setShowStations(!showStations)}
          >
            {showStations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
        <Typography style={{ padding: '0.5rem' }}>{`Round ${number} (${stations.length} ${stations.length === 1 ? "station" : "stations"})`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {showStations && stations.map((station, index) => (
            <Station
              style={{
                borderTop: index > 0 ? 'solid 1px #ccc' : 0,
              }}
              key={station.guid}
              station={station}
              removeStation={() => removeStation(index)}
              updateStation={stationData => updateStation(stationData, index)}
            />
        ))}
      </Grid>
    </Grid>
  );
};

export default Round;