import React from "react";
import Grid from "@material-ui/core/Grid";
import { PersistentItemsProvider } from "./components/PersistentItemsProvider";
import { QRZSessionProvider } from "./components/QRZSession";
import Netlogs from "./components/Netlogs";
import StatusBar from './components/StatusBar';
import "./styles.css";

export default function App() {
  return (
    <PersistentItemsProvider localStorageKey="nets">
      <QRZSessionProvider>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StatusBar />
          </Grid>
          <Grid item xs={12}>
            <Netlogs />
          </Grid>
        </Grid>
      </QRZSessionProvider>
    </PersistentItemsProvider>
  );
}
