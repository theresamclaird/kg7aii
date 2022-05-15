import React, { useRef, useContext, useReducer, useState, Profiler } from "react";
import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
  RESET: "RESET"
};

const stationsReducer = (state, action) => {
  switch (action.type) {
    case STATIONS.ADD:
      return [...state, { guid: v4(), ...action.payload }];
    case STATIONS.RESET:
      return [];
    default:
      return state;
  }
};

export default ({ number, addRoundToNet }) => {
  const { lookupCallsign } = useContext(QRZSessionContext);
  const [station, stationDispatch] = useReducer(stationReducer, initialStation);
  const [stations, stationsDispatch] = useReducer(stationsReducer, []);
  const callsignRef = useRef(null);
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);

  const resetStationForm = () => {
    stationDispatch({ type: STATION.RESET });
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
        <Grid container xs={12} spacing={2}>
          <Grid item xs={12}> {/* callsign field */}
            <TextField
              autoFocus
              label="callsign"
              value={station.callsign}
              inputRef={callsignRef}
              variant="outlined"
              size="small"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                const callsign = e.target.value;
                stationDispatch({
                  type: STATION.CALLSIGN,
                  payload: callsign
                });
                if (validateCallsign(callsign)) {
                  lookupCallsign(callsign).then((station) =>
                    stationDispatch({
                      type: STATION.SET,
                      payload: {
                        name: station.name,
                        location: station.location,
                        image: station.image,
                      }
                    })
                  );
                } else {
                  stationDispatch({ type: STATION.CLEAR });
                }
              }}
            />
          </Grid>
          <Grid item xs={6}> {/* handle field */}
            <TextField
              fullWidth={true}
              label="Handle"
              value={station.handle}
              variant="outlined"
              size="small"
              onKeyPress={handleKeyPress}
              onChange={(e) => stationDispatch({ type: STATION.HANDLE, payload: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}> {/* qth field */}
            <TextField
              fullWidth={true}
              label="QTH"
              value={station.qth}
              variant="outlined"
              size="small"
              onKeyPress={handleKeyPress}
              onChange={(e) => stationDispatch({ type: STATION.QTH, payload: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}> {/* status fields */}
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
                label="In/Out"
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
                label="Mobile"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={station.internet}
                    onChange={(e) => {
                      stationDispatch({
                        type: STATION.INTERNET,
                        payload: e.target.checked
                      });
                    }}
                    onKeyPress={handleKeyPress}
                    name="internet"
                    color="primary"
                  />
                }
                label="Internet"
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
                label="Recheck"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}> {/* qrz data */}
        <Grid container xs={12}>
          <Grid item xs={6}> {/* text data */}
            <Typography variant="body2">{station.name}<br />{station.location}</Typography>
          </Grid>
          <Grid item xs={6} style={{ height: '200px' }}> {/* image */}
            {station?.image && <Box
              onClick={() => setOpenProfileImageModal(true)}
              component="img"
              style={{
                border: 'solid 2px black',
                cursor: 'pointer',
                maxWidth: "100%",
                maxHeight: "200px",
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
        <Round number={number} stations={stations} />
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
