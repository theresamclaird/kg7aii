import React, { useState } from "react";
import RoundForm from "../RoundForm";
import Round from "../Round";
import Grid from "@material-ui/core/Grid";

const NetForm = ({ addItem }) => {
  const [rounds, setRounds] = useState([]);

  const addRoundToNet = (round) => {
    setRounds([...rounds, round]);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      justify="space-around"
      spacing={4}
    >
      <Grid item xs={12}>
        <RoundForm number={rounds.length + 1} addRoundToNet={addRoundToNet} />
      </Grid>
      {rounds.length > 0 && (
        <Grid item xs={12}>
          {rounds.map((stations, roundIndex) => (
            <Round
              allowHideStations={true}
              key={roundIndex}
              number={roundIndex + 1}
              stations={stations}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default NetForm;