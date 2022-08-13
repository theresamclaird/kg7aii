import React, { useState } from "react";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Typography,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import Station from "../Station";
import { v4 as uuidv4 } from 'uuid';

const Round = ({
  number,
  stations,
  allowHideStations = false,
  hideStations = false,
  removeStation,
  updateStation,
  addRound,
}) => {
  const [showStations, setShowStations] = useState(!hideStations);

  return (
    <Grid container>
      <Grid item xs={12} sx={{
        backgroundColor: 'info.main',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      {addRound}
        {allowHideStations && (
          <IconButton
            sx={{ color: 'white' }}
            size="small"
            onClick={() => setShowStations(!showStations)}
          >
            {showStations ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
        <Typography style={{ padding: '0.5rem' }}>{`Round ${number} (${stations.length} ${stations.length === 1 ? "station" : "stations"})`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {showStations && stations.map((station, index) => (
            <Station
              style={{ borderTop: index > 0 ? 'solid 1px #ccc' : 0 }}
              key={uuidv4()}
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