import React, { useState } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import Round from './Round';

const Net = ({ timestamp, rounds, removeNet }) => {
    const [show, setShow] = useState(false);
    const d = new Date(timestamp);
    const netTime = d.toLocaleString(Navigator?.languages?.[0] || 'en-US', { hour12: false });
    const stationsCount = rounds.reduce((total, round) => total + round.length, 0);
    const roundsCount = rounds.length;
      return (
        <Paper sx={{ p: 1, backgroundColor: 'secondary.light' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 1,
                        color: 'white',
                    }}
                >
                    <IconButton sx={{ color: 'white' }} onClick={() => setShow(!show)}>
                        {show ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <Typography>{`${netTime} (${roundsCount} ${roundsCount === 1 ? 'round' : 'rounds'}, ${stationsCount} ${stationsCount === 1 ? 'station' : 'stations'})`}</Typography>
                </Box>
                <IconButton onClick={removeNet}>
                    <Delete />
                </IconButton>
            </Box>
            {show && rounds.map((stations, roundIndex) => (
                <Round
                    allowHideStations={true}
                    hideStations={true}
                    key={roundIndex}
                    number={roundIndex + 1}
                    stations={stations}
                />
            ))}
        </Paper>
    );
};

export default Net;