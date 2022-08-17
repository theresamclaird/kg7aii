import React, { useRef, useState, useContext, useEffect } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import { AddBox } from '@mui/icons-material';
import { QRZSessionContext } from "../QRZSession";
import useDebounce from '../../hooks/useDebounce';
import Attributes from '../Attributes';
import QrzStationInformation from "./QrzStationInformation";
import validateCallsign from "../../utils/validateCallsign";

const StationForm = ({ addStationToRound }) => {
    const { lookupCallsign } = useContext(QRZSessionContext);
    const callSignRef = useRef(null);
    const [callSign, setCallSign] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [qrzData, setQrzData] = useState(null);

    const resetStation = () => {
        setCallSign('');
        setName('');
        setLocation('');
        setAttributes([]);
        setQrzData(null);
    };

    const addStation = station => {
        addStationToRound({ callSign, name, location, attributes, qrzData });
        resetStation();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          if (!validateCallsign(callSign)) {
            return;
          }
    
          addStation();
        }
    };
    
    useEffect(() => console.table(qrzData), [qrzData]);

    useDebounce(() => {
        if (!validateCallsign(callSign)) {
          callSignRef.current.focus();
          return;
        }
    
        lookupCallsign(callSign).then(qrzData => setQrzData(qrzData));
    }, 250, [callSign]);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={6} sm={4} md={2} lg={3}>
                <TextField
                    sx={{ width: '100%' }}
                    autoFocus
                    label="Call Sign"
                    value={callSign}
                    inputRef={callSignRef}
                    variant="outlined"
                    size="small"
                    onKeyPress={handleKeyPress}
                    onChange={e => setCallSign(e.target.value)}
                />
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <TextField
                    sx={{ width: '100%' }}
                    label="Name"
                    value={name}
                    variant="outlined"
                    size="small"
                    onKeyPress={handleKeyPress}
                    onChange={e => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                    sx={{ width: '100%' }}
                    label="Location"
                    value={location}
                    variant="outlined"
                    size="small"
                    onKeyPress={handleKeyPress}
                    onChange={e => setLocation(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Attributes
                    values={attributes}
                    onChange={(e, attributes) => setAttributes(attributes)}
                    onKeyPress={handleKeyPress}
                />
                <IconButton onClick={addStation} variant="contained" color="primary">
                    <AddBox />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                {qrzData && <QrzStationInformation {...qrzData} />}
            </Grid>
        </Grid>

    );
};

export default StationForm;