import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Round from './Round';

const Net = ({ timestamp, rounds, removeNet }) => {
    const d = new Date(0);
    d.setUTCMilliseconds(timestamp)
    return (
        <Paper sx={{ p: 1 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography>{d.toLocaleString(Navigator?.languages?.[0] || 'en-US', { hour12: false })}</Typography>
                <IconButton onClick={removeNet}>
                    <Delete />
                </IconButton>
            </Box>
            {rounds.map((stations, roundIndex) => (
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