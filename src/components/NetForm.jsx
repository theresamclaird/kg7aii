import React from "react";
import { Box, Grid, Paper, Stack, IconButton, Typography } from '@mui/material';
import { KeyboardDoubleArrowDown, Delete } from '@mui/icons-material';
import { useLocalStorage } from "../hooks/useStorage";
import RoundForm from "./RoundForm";
import Round from "./Round";

const NetForm = ({ closeNet }) => {
  const [rounds, setRounds] = useLocalStorage('rounds', []);

  const addRoundToNet = (round) => {
    setRounds([...rounds, round]);
  };

  const removeStationFromRound = (roundIndex, stationIndex) => setRounds(rounds.map((round, index) => {
    if (index !== roundIndex) {
      return round;
    }
    return round.filter((station, index) => index !== stationIndex);
  }));

  const updateStationInRound = (stationData, roundIndex, stationIndex) => setRounds(rounds.map((round, index) => {
    if (index !== roundIndex) {
      return round;
    }
    return round.map((station, index) => index === stationIndex ? { ...station, ...stationData } : station);
  }));

  const stationsCount = rounds.reduce((total, round) => total + round.length, 0);
  const roundsCount = rounds.length;

  return (
    <Paper sx={{ p: 1 }}>
      <Stack sx={{
        backgroundColor: 'secondary.light',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{ color: 'white' }}
            size="small"
            onClick={() => {
              closeNet({ timestamp: Date.now(), rounds });
              setRounds([]);
            }}
          ><KeyboardDoubleArrowDown /></IconButton>
          <Typography sx={{ color: 'white' }}>{`(${roundsCount} ${roundsCount === 1 ? 'round' : 'rounds'}, ${stationsCount} ${stationsCount === 1 ? 'station' : 'stations'})`}</Typography>
        </Box>
        <IconButton
          sx={{ color: 'white' }}
          onClick={() => setRounds([])}
        ><Delete /></IconButton>
      </Stack>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <RoundForm number={rounds.length + 1} addRoundToNet={addRoundToNet} />
        </Grid>
        {rounds.map((stations, roundIndex) => (
          <Grid item xs={12} key={`round-${roundIndex}`}>
            <Round
              allowHideStations={true}
              hideStations={true}
              key={roundIndex}
              number={roundIndex + 1}
              stations={stations}
              removeStation={stationIndex => removeStationFromRound(roundIndex, stationIndex)}
              updateStation={(stationData, stationIndex) => updateStationInRound(stationData, roundIndex, stationIndex)}
              removeRound={() => setRounds(rounds.filter((round, index) => roundIndex !== index))}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default NetForm;