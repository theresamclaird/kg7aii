import React, { useContext } from "react";
import { PersistentItemsContext } from "../PersistentItemsProvider";
import { Grid } from "@material-ui/core";
import NetForm from "../NetForm";

const NetLogs = () => {
  const { addItem } = useContext(PersistentItemsContext);
  return (
    <Grid container spacing={4} justify="space-around">
      <Grid item xs={10}><NetForm addItem={addItem} /></Grid>
    </Grid>
  );
};

export default NetLogs;