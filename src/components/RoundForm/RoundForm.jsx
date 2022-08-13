import React, { useRef, useContext, useReducer, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  FormGroup,
} from "@mui/material";
import { AddBox } from '@mui/icons-material';
import { v4 } from "uuid";
import Round from "../Round";
import { QRZSessionContext } from "../QRZSession";
import validateCallsign from "../../utils/validateCallsign";
import ImageModal from "../ImageModal";
import useDebounce from '../../hooks/useDebounce';
import QrzStationInformation from "./QrzStationInformation";
import Attributes from '../Attributes';
import genericProfilePicture from '../../images/genericProfile.png';

const initialStation = {
  callsign: "",
  attributes: [],
  inAndOut: false,
  mobile: false,
  qrz: null,
  reported: false,
};

const STATION = {
  UPDATE: "UPDATE",
  RESET: "RESET",
};

const stationReducer = (station, action) => {
  switch (action.type) {
    case STATION.UPDATE:
      return { ...station, ...action.payload }
    case STATION.RESET:
      return initialStation;
    default:
      return station;
  }
};

const STATIONS = {
  ADD: "ADD",
  RESET: "RESET",
  REMOVE: "REMOVE",
  UPDATE: "UPDATE",
};

const stationsReducer = (stations, action) => {
  switch (action.type) {
    case STATIONS.REMOVE:
      return stations.filter((station, index) => index !== action.payload.index);
    case STATIONS.ADD:
      return [...stations, { guid: v4(), ...action.payload }];
    case STATIONS.RESET:
      return [];
    case STATIONS.UPDATE:
      return stations.map((station, index) => index === action.payload.index ? { ...station, ...action.payload.stationData } : station);
    default:
      return stations;
  }
};

const RoundForm = ({ number, addRoundToNet }) => {
  const { lookupCallsign } = useContext(QRZSessionContext);
  const [station, stationDispatch] = useReducer(stationReducer, initialStation);
  const [stations, stationsDispatch] = useReducer(stationsReducer, []);
  const callsignRef = useRef(null);
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
  const [callsign, setCallsign] = useState('');

  useDebounce(() => {
    if (!validateCallsign(callsign)) {
      stationDispatch({ type: STATION.RESET });
      callsignRef.current.focus();
      return;
    }

    stationDispatch({ type: STATION.UPDATE, payload: { callsign } });
    lookupCallsign(callsign).then(qrzData => {
      return stationDispatch({
        type: STATION.UPDATE,
        payload: { qrz: qrzData },
      });
    });
  }, 250, [callsign]);

  const resetStationForm = () => {
    stationDispatch({ type: STATION.RESET });
    setCallsign('');
    callsignRef.current.focus();
  };

  const addStationToRound = () => {
    stationsDispatch({ type: STATIONS.ADD, payload: { ...station, callsign } });
    resetStationForm();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!validateCallsign(callsign)) {
        return;
      }

      addStationToRound();
    }
  };

  return (
    <Grid container rowSpacing={1}>
        <Grid item xs={9}>
            <FormGroup
                row
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
              <TextField
                  autoFocus
                  label="callsign"
                  value={callsign}
                  inputRef={callsignRef}
                  variant="outlined"
                  size="small"
                  onKeyPress={handleKeyPress}
                  onChange={e => setCallsign(e.target.value)}
              />
              <Attributes
                values={station.attributes}
                onChange={(e, attributes) => {
                  stationDispatch({
                    type: STATION.UPDATE,
                    payload: { attributes },
                  })
                }}
                onKeyPress={handleKeyPress}
              />
              <IconButton
                onClick={() => addStationToRound()}
                variant="contained"
                color="primary"
              ><AddBox /></IconButton>
            </FormGroup>
            <Box sx={{ mt: 1 }}>{station?.qrz && <QrzStationInformation {...station?.qrz} />}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box
                onClick={() => station?.qrz?.image && setOpenProfileImageModal(true)}
                as="img"
                sx={{
                    cursor: station?.qrz?.image ? 'pointer' : 'default',
                    height: '13rem',
                    objectFit: "contain",
                    m: 0,
                    p: 0,
                    float: 'right',
                }}
                src={station?.qrz?.image || genericProfilePicture}
            />
            {station?.qrz?.image && (
                <ImageModal open={openProfileImageModal} handleClose={() => setOpenProfileImageModal(false)}>
                    <Box sx={{ width: '100%' }} as="img" src={station?.qrz?.image} />
                </ImageModal>
            )}
        </Grid>
        <Grid item xs={12}>
            <Round
                number={number}
                stations={stations.sort((a, b) => Number(b.attributes.includes('mobile') - Number(a.attributes.includes('mobile'))))}
                removeStation={index => stationsDispatch({ type: STATIONS.REMOVE, payload: { index }})}
                updateStation={(stationData, index) => stationsDispatch({ type: STATIONS.UPDATE, payload: { stationData, index }})}
                addRound={stations.length > 0 && (
                    <IconButton
                      sx={{ color: 'white' }}
                      size="small"
                      onClick={() => {
                          addRoundToNet(stations);
                          stationsDispatch({ type: STATIONS.RESET });
                          resetStationForm();
                      }}
                    ><AddBox /></IconButton>
                )}
            />
        </Grid>
    </Grid>
  );
};

export default RoundForm;