import React, { useState } from "react";
import RoundForm from "../RoundForm";
import Round from "../Round";
import { Box } from "@material-ui/core";

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

  return (
    <Box>
      <RoundForm number={rounds.length + 1} addRoundToNet={addRoundToNet} />
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '1rem',
      }}>
        {rounds.map((stations, roundIndex) => (
          <Round
            allowHideStations={true}
            key={roundIndex}
            number={roundIndex + 1}
            stations={stations}
            removeStation={stationIndex => removeStationFromRound(roundIndex, stationIndex)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default NetForm;