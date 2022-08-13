import React from "react";
import { Box, Grid } from '@mui/material';
import { PersistentItemsProvider } from './components/PersistentItemsProvider';
import { QRZSessionProvider } from './components/QRZSession';
import NetForm from './components/NetForm';
import StatusBar from './components/StatusBar';
import "./styles.css";

/* Todo:
 * 
 * - add timestamp to stations in a round; update sort order by mobile, chronological
 * - add configuration for:
 *      - preamble
 *      - closing
 *      - order of stations in a round
 *      - colors/theme?
 * 
*/

export default function App() {
  return (
    <PersistentItemsProvider localStorageKey="nets">
      <QRZSessionProvider>
        <StatusBar />
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <NetForm />
            </Box>
          </Grid>
        </Grid>
      </QRZSessionProvider>
    </PersistentItemsProvider>
  );
}
