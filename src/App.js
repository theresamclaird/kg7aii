import React from "react";
import { Container, Grid } from '@mui/material';
import { useLocalStorage } from "./hooks/useStorage";
import { QRZSessionProvider } from './components/QRZSession';
import NetForm from './components/NetForm';
import StatusBar from './components/StatusBar';
import Net from './components/Net';
import "./styles.css";

const App = () => {
  const [nets, setNets] = useLocalStorage('nets', []);
  return (
    <QRZSessionProvider>
      <StatusBar />
      <Container sx={{ mt: 1 }}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <NetForm closeNet={net => setNets([ ...nets, net ])} />
          </Grid>
          {nets.sort((a, b) => b.timestamp - a.timestamp).map(({ timestamp, rounds }, netIndex) => (
            <Grid item xs={12} key={netIndex}>
              <Net
                timestamp={timestamp}
                rounds={rounds}
                removeNet={() => setNets(nets.filter((net, index) => index !== netIndex))}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </QRZSessionProvider>
  );
};

export default App;