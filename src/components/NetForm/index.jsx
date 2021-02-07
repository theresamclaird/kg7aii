import React, { useState } from "react";
import RoundForm from "../RoundForm";
import Round from "../Round";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const getFormattedDate = (dateNow) => {
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month =
    monthWithOffset.toString().length < 2
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  return `${year}-${month}-${date}`;
};

const getFormattedStartTime = () => {
  const dateNow = new Date();
  const hours = dateNow.getHours();
  const applesauce = hours < 9 ? "09:00" : "21:00";
  const formattedDate = getFormattedDate(dateNow);
  return `${formattedDate}T${applesauce}`;
};

const getFormattedEndTime = () => {
  const dateNow = new Date();
  const hours = dateNow.getHours();
  const applesauce = hours < 9 ? "10:00" : "22:00";
  const formattedDate = getFormattedDate(dateNow);
  return `${formattedDate}T${applesauce}`;
};

export default ({ addItem }) => {
  const [net, setNet] = useState({
    host: "kg7aii",
    start: getFormattedStartTime(),
    end: getFormattedEndTime()
  });
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          fullWidth={true}
          label="Start"
          type="datetime-local"
          defaultValue={net.start}
          onChange={(e) => setNet({ ...net, start: e.target.value })}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          fullWidth={true}
          label="End"
          type="datetime-local"
          defaultValue={net.end}
          onChange={(e) => setNet({ ...net, end: e.target.value })}
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          fullWidth={true}
          label="Net Controller"
          defaultValue={net.host}
          variant="outlined"
          size="small"
          onChange={(e) => setNet({ ...net, host: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={12} lg={3}>
        <Button
          style={{ float: "right" }}
          variant="contained"
          startIcon={<SaveIcon />}
          color="primary"
          onClick={() => addItem({ ...net, rounds })}
          size="small"
        >
          Net
        </Button>
      </Grid>
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
