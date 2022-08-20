import React from "react";
import { Stack, Container, IconButton } from "@mui/material";
import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { useLocalStorage } from '../hooks/useStorage';
import Round from "./Round";
import StationForm from './StationForm';

const RoundForm = ({ number, addRoundToNet }) => {
  const [stations, setStations] = useLocalStorage('stations', []);
  const addStationToRound = station => setStations([ ...stations, station ].sort((a, b) => Number(b.attributes.includes('mobile') - Number(a.attributes.includes('mobile')))));

  return (
    <Container>
      <Stack sx={{ mb: 2 }}>
        <StationForm addStationToRound={station => addStationToRound(station)} />
      </Stack>
      <Stack>
      <Round
        number={number}
        stations={stations}
        removeStation = {stationIndex => setStations(stations.filter((station, index) => index !== stationIndex))}
        updateStation={(stationData, stationIndex) => setStations(stations.map((station, index) => index === stationIndex ? { ...station, ...stationData } : station))}
        addRound={stations.length > 0 && (
            <IconButton
              sx={{ color: 'white' }}
              size="small"
              onClick={() => {
                  addRoundToNet(stations);
                  setStations([]);
              }}
            ><KeyboardDoubleArrowDown /></IconButton>
        )}
      />
      </Stack>
    </Container>
  );
};

export default RoundForm;