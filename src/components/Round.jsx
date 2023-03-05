import React, { useState } from "react";
import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import Station from "./Station";
import { v4 as uuidv4 } from 'uuid';

const Round = ({
  number,
  stations,
  allowHideStations = false,
  hideStations = false,
  removeStation,
  updateStation,
  addRound,
  removeRound,
}) => {
  const [showStations, setShowStations] = useState(!hideStations);

  return (
    <Grid container>
      <Grid item xs={11} sx={{
        backgroundColor: 'primary.light',
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
      <Grid item xs={1} sx={{
        backgroundColor: 'primary.light',
        color: 'white',
        display: 'flex',
        justifyContent: 'flex-end',
        pr: 1,
      }}>
        {removeRound && <IconButton
            sx={{ color: 'white' }}
            size="small"
            onClick={removeRound}
            disabled={stations.length === 0}
          >
            <Delete />
          </IconButton>}
      </Grid>
      <Grid item xs={12}>
        {showStations && stations.map((station, index) => (
            <Station
              key={uuidv4()}
              station={station}
              removeStation={removeStation ? () => removeStation(index) : null}
              updateStation={updateStation ? stationData => updateStation(stationData, index) : null}
              sx={{ borderTop: index > 0 ? 'solid 1px #ccc' : 0 }}
            />
        ))}
      </Grid>
    </Grid>
  );
};

export default Round;