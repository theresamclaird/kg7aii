import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Station from "../Station";

const Round = ({ number, stations, allowHideStations = false, removeStation, updateStation }) => {
  const [showStations, setShowStations] = useState(true);

  return (
    <Grid container>
      <Grid item xs={12} sx={{
        backgroundColor: 'info.main',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
      }}>
        {allowHideStations && (
          <IconButton
            sx={{ color: 'white' }}
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