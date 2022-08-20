import React from "react";
import { Container } from '@mui/material';
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

const App = () => (
  <QRZSessionProvider>
    <StatusBar />
    <Container sx={{ mt: 1 }}>
      <NetForm />
    </Container>
  </QRZSessionProvider>
);

export default App;