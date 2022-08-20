import React, { useRef, useState, useContext } from "react";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { AddBox } from '@mui/icons-material';
import { QRZSessionContext } from "../QRZSession";
import useDebounce from '../../hooks/useDebounce';
import LogAttributes from '../Attributes';
import QrzStationInformation from "./QrzStationInformation";
import validateCallsign from "../../utils/validateCallsign";

const StationForm = ({ addStationToRound }) => {
    const { lookupCallsign } = useContext(QRZSessionContext);
    const callSignRef = useRef(null);
    const [qrzData, setQrzData] = useState(null);
    const [station, setStation] = useState({
        callSign: '',
        name: '',
        location: '',
        attributes: [],
    });

    const addStation = () => {
        addStationToRound({ ...station, qrzData });
        setStation({
            callSign: '',
            name: '',
            location: '',
            attributes: [],
        });
        setQrzData(null);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            addStation();
            callSignRef.current.focus();
        }
    };
    
    useDebounce(() => {
        if (!validateCallsign(station.callSign)) {
            return;
        }
    
        lookupCallsign(station.callSign).then(qrzData => {
            setStation({
                ...station,
                name: station?.name || qrzData?.name_fmt,
                location: station?.location || `${qrzData?.addr2}${qrzData?.state ? `, ${qrzData.state}` : ''}`,
            });
            setQrzData(qrzData);
        });
    }, 250, [station.callSign]);
    
    return (
        <Box as="form" onKeyPress={handleKeyPress}>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={4} md={2} lg={3}>
                    <TextField
                        sx={{ width: '100%' }}
                        autoFocus
                        label="Call Sign"
                        value={station.callSign}
                        inputRef={callSignRef}
                        variant="outlined"
                        size="small"
                        onChange={e => setStation({ ...station, callSign: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={3}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Name"
                        value={station.name}
                        variant="outlined"
                        size="small"
                        onChange={e => setStation({ ...station, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <TextField
                        sx={{ width: '100%' }}
                        label="Location"
                        value={station.location}
                        variant="outlined"
                        size="small"
                        onChange={e => setStation({ ...station, location: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <LogAttributes
                        attributes={station.attributes}
                        setAttributes={attributes => setStation({
                                ...station,
                                reported: station.reported || attributes.includes('inAndOut'),
                                attributes,
                            })
                        }
                    />
                    <IconButton
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                        onClick={addStation}
                        variant="contained"
                        color="primary">
                        <AddBox />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <QrzStationInformation {...qrzData} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default StationForm;