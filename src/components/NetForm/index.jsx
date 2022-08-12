import React, { useState } from "react";
import { Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import RoundForm from "../RoundForm";
import Round from "../Round";

const NetForm = () => {
  const [rounds, setRounds] = useState([]);

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

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>

        <Paper sx={{ p: 1 }}>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <RoundForm number={rounds.length + 1} addRoundToNet={addRoundToNet} />
            </Grid>
            {rounds.map((stations, roundIndex) => (
              <Grid item xs={12} key={`round-${roundIndex}`}>
                <Round
                  allowHideStations={true}
                  key={roundIndex}
                  number={roundIndex + 1}
                  stations={stations}
                  removeStation={stationIndex => removeStationFromRound(roundIndex, stationIndex)}
                  updateStation={(stationData, stationIndex) => updateStationInRound(stationData, roundIndex, stationIndex)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
};

export default NetForm;