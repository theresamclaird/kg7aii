import React, { useRef, useContext, useReducer, useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Round from "../Round";
import Paper from "@material-ui/core/Paper";
import QueueIcon from "@material-ui/icons/Queue";
import { v4 } from "uuid";
import { QRZSessionContext } from "../QRZSession";
import validateCallsign from "../../utils/validateCallsign";
import ImageModal from "../ImageModal";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import useDebounce from '../../hooks/useDebounce';

const initialStation = {
  timestamp: null,
  callsign: "",
  name: "",
  location: "",
  handle: "",
  qth: "",
  cm: 0,
  inAndOut: false,
  mobile: false,
  internet: false,
  recheck: false,
  signal: ""
};

const STATION = {
  SET: "SET",
  CALLSIGN: "CALLSIGN",
  HANDLE: "HANDLE",
  QTH: "QTH",
  CM: "CM",
  INANDOUT: "INANDOUT",
  MOBILE: "MOBILE",
  INTERNET: "INTERNET",
  RECHECK: "RECHECK",
  SIGNAL: "SIGNAL",
  RESET: "RESET",
  CLEAR: "CLEAR"
};

const stationReducer = (state, action) => {
  switch (action.type) {
    case STATION.SET:
      return { ...state, ...action.payload };
    case STATION.CALLSIGN:
      return { ...state, callsign: action.payload };
    case STATION.HANDLE:
      return { ...state, handle: action.payload };
    case STATION.QTH:
      return { ...state, qth: action.payload };
    case STATION.CM:
      return { ...state, cm: action.payload };
    case STATION.INANDOUT:
      return { ...state, inAndOut: action.payload };
    case STATION.MOBILE:
      return { ...state, mobile: action.payload };
    case STATION.INTERNET:
      return { ...state, internet: action.payload };
    case STATION.RECHECK:
      return { ...state, recheck: action.payload };
    case STATION.SIGNAL:
      return { ...state, signal: action.payload };
    case STATION.RESET:
      return initialStation;
    case STATION.CLEAR:
      return { ...state, name: "", location: "", image: "" };
    default:
      return state;
  }
};

const STATIONS = {
  ADD: "ADD",
  RESET: "RESET",
  REMOVE: "REMOVE",
};

const stationsReducer = (state, action) => {
  switch (action.type) {
    case STATIONS.REMOVE:
      return [...state].filter((station, index) => index !== action.payload.index);
    case STATIONS.ADD:
      return [...state, { guid: v4(), ...action.payload }];
    case STATIONS.RESET:
      return [];
    default:
      return state;
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
    lookupCallsign(callsign).then(station => stationDispatch({
      type: STATION.SET,
      payload: {
        name: station.name,
        location: station.location,
        image: station.image,
      }
    }));
  }, 500, [callsign]);

  const resetStationForm = () => {
    stationDispatch({ type: STATION.RESET });
    setCallsign('');
    callsignRef.current.focus();
  };

  const addStationToRound = () => {
    stationsDispatch({ type: STATIONS.ADD, payload: station });
    resetStationForm();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addStationToRound();
    }
  };

  return (
    <Grid
      item
      container
      justify="space-between"
      xs={12}
      spacing={3}
      component={Paper}
    >
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}> {/* callsign field */}
            <FormGroup row>
              <TextField
                autoFocus
                label="callsign"
                value={callsign}
                inputRef={callsignRef}
                variant="outlined"
                size="small"
                onKeyPress={handleKeyPress}
                onChange={e => setCallsign(e.target.value)}
                style={{ marginRight: '1rem' }}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
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
                label="🔃"
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
                label="🚗"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={station.recheck}
                    onChange={(e) => {
                      stationDispatch({
                        type: STATION.RECHECK,
                        payload: e.target.checked
                      });
                    }}
                    onKeyPress={handleKeyPress}
                    name="recheck"
                    color="primary"
                  />
                }
                label="📢"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}> {/* qrz data */}
        <Grid container>
          <Grid item xs={6}> {/* text data */}
            <Typography variant="body2">
              {station.name}<br />
              {station.location}<br />
              {station.callsign && <a href={`https://www.qrz.com/db/${station.callsign}`} target="_blank">QRZ</a>}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ height: '150px' }}> {/* image */}
            {station?.image && <Box
              onClick={() => setOpenProfileImageModal(true)}
              component="img"
              style={{
                border: 'solid 2px black',
                cursor: 'pointer',
                maxWidth: "100%",
                maxHeight: "150px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                float: 'right',
              }}
              src={station.image}
            />}
            <ImageModal open={openProfileImageModal} handleClose={() => setOpenProfileImageModal(false)}>
              <Box
                component="img"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
                src={station.image}
              />
            </ImageModal>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}> {/* round */}
        <Round number={number} stations={stations} removeStation={index => stationsDispatch({ type: STATIONS.REMOVE, payload: { index }})} />
      </Grid>
      {stations.length > 0 && (
        <Grid item xs={12}>
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
        </Grid>
      )}
    </Grid>
  );
};

export default RoundForm;