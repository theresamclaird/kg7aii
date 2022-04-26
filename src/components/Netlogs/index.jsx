import React, { useContext } from "react";
import { PersistentItemsContext } from "../PersistentItemsProvider";
import { Grid } from "@material-ui/core";
import NetForm from "../NetForm";
import NetsTable from "../NetsTable";

export default () => {
  const { items, addItem, removeItem } = useContext(PersistentItemsContext);
  return (
    <Grid container spacing={4} justify="space-around">
      <Grid item xs={10}>
        <NetForm addItem={addItem} />
      </Grid>
      {items.length > 0 && (
        <Grid item xs={10}>
          <NetsTable items={items} removeItem={removeItem} />
        </Grid>
      )}
    </Grid>
  );
};
