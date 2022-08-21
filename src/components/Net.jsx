import React, { useState } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import Round from './Round';

const Net = ({ timestamp, rounds, removeNet }) => {
    const [show, setShow] = useState(false);
    const d = new Date(timestamp);
    return (
        <Paper sx={{ p: 1, }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IconButton onClick={() => setShow(!show)}>
                    {show ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography>{d.toLocaleString(Navigator?.languages?.[0] || 'en-US', { hour12: false })}</Typography>
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