import React, { useReducer } from "react";
import { Grid, IconButton } from "@mui/material";
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { v4 } from "uuid";
import Round from "../Round";
import StationForm from '../StationForm';

const STATIONS = {
  ADD: "ADD",
  RESET: "RESET",
  REMOVE: "REMOVE",
  UPDATE: "UPDATE",
};

const stationsReducer = (stations, action) => {
  switch (action.type) {
    case STATIONS.REMOVE:
      return stations.filter((station, index) => index !== action.payload.index);
    case STATIONS.ADD:
      return [...stations, { guid: v4(), ...action.payload }].sort((a, b) => Number(b.attributes.includes('mobile') - Number(a.attributes.includes('mobile'))));
    case STATIONS.RESET:
      return [];
    case STATIONS.UPDATE:
      return stations.map((station, index) => index === action.payload.index ? { ...station, ...action.payload.stationData } : station);
    default:
      return stations;
  }
};

const RoundForm = ({ number, addRoundToNet }) => {
  const [stations, stationsDispatch] = useReducer(stationsReducer, []);

  const addStationToRound = station => stationsDispatch({ type: STATIONS.ADD, payload: { ...station } });

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <StationForm addStationToRound={station => addStationToRound(station)} />
      </Grid>
      <Grid item xs={12}>
          <Round
              number={number}
              stations={stations}
              removeStation={index => stationsDispatch({ type: STATIONS.REMOVE, payload: { index }})}
              updateStation={(stationData, index) => stationsDispatch({ type: STATIONS.UPDATE, payload: { stationData, index }})}
              addRound={stations.length > 0 && (
                  <IconButton
                    sx={{ color: 'white' }}
                    size="small"
                    onClick={() => {
                        addRoundToNet(stations);
                        stationsDispatch({ type: STATIONS.RESET });
                    }}
                  ><KeyboardDoubleArrowDown /></IconButton>
              )}
          />
      </Grid>
    </Grid>
  );
};

export default RoundForm;