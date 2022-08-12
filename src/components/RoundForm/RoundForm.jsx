import React, { useRef, useContext, useReducer, useState } from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Round from "../Round";
import QueueIcon from "@mui/icons-material/Queue";
import { v4 } from "uuid";
import { QRZSessionContext } from "../QRZSession";
import validateCallsign from "../../utils/validateCallsign";
import ImageModal from "../ImageModal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useDebounce from '../../hooks/useDebounce';
import QrzStationInformation from "./QrzStationInformation";
import genericProfilePicture from '../../images/genericProfile.png';

const initialStation = {
  callsign: "",
  inAndOut: false,
  mobile: false,
  qrz: null,
};

const STATION = {
  QRZ: "QRZ",
  CALLSIGN: "CALLSIGN",
  INANDOUT: "INANDOUT",
  MOBILE: "MOBILE",
  RESET: "RESET",
};

const stationReducer = (station, action) => {
  switch (action.type) {
    case STATION.QRZ:
      return { ...station, qrz: action.payload };
    case STATION.CALLSIGN:
      return { ...station, callsign: action.payload };
    case STATION.INANDOUT:
      return { ...station, inAndOut: action.payload };
    case STATION.MOBILE:
      return { ...station, mobile: action.payload };
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

    stationDispatch({ type: STATION.CALLSIGN, payload: callsign });
    lookupCallsign(callsign).then(qrzData => {
      console.log('lookupCallsign', qrzData);
      return stationDispatch({
        type: STATION.QRZ,
        payload: qrzData,
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
    if (e.key === "Enter") {
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
              <FormControlLabel
                  control={
                  <Checkbox
                      checked={station.inAndOut}
                      onChange={(e) => {
                      stationDispatch({
                          type: STATION.INANDOUT,
                          payload: e.target.checked
                      });
                      }}
                      onKeyPress={handleKeyPress}
                      name="inAndOut"
                      color="primary"
                  />
                  }
                  label="↩️ (I/O)"
              />
              <FormControlLabel
                  control={
                  <Checkbox
                      checked={station.mobile}
                      onChange={(e) => {
                      stationDispatch({
                          type: STATION.MOBILE,
                          payload: e.target.checked
                      });
                      }}
                      onKeyPress={handleKeyPress}
                      name="mobile"
                      color="primary"
                  />
                  }
                  label="🚗 (Mobile)"
              />
            </FormGroup>
            <Box sx={{ mt: 1 }}>{station?.qrz && <QrzStationInformation {...station?.qrz} />}</Box>
        </Grid>
        <Grid item xs={3}>
            <Box
                onClick={() => station?.qrz?.image && setOpenProfileImageModal(true)}
                as="img"
                sx={{
                    cursor: station?.qrz?.image ? 'pointer' : 'default',
                    maxHeight: '13rem',
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
                stations={stations}
                removeStation={index => stationsDispatch({ type: STATIONS.REMOVE, payload: { index }})}
                updateStation={(stationData, index) => stationsDispatch({ type: STATIONS.UPDATE, payload: { stationData, index }})}
            />
        </Grid>
        <Grid item xs={12}>
          {stations.length > 0 && (
              <Button
                startIcon={<QueueIcon />}
                variant="contained"
                color="primary"
                onClick={() => {
                    addRoundToNet(stations);
                    stationsDispatch({ type: STATIONS.RESET });
                    resetStationForm();
                }}
                size="small"
              >
                Round
              </Button>
          )}
        </Grid>
    </Grid>
  );
};

export default RoundForm;