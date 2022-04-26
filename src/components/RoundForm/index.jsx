import React, { useRef, useContext, useReducer } from "react";
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

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const initialStation = {
  timestamp: null,
  callsign: "",
  name: "",
  location: "",
  inAndOut: false,
  mobile: false,
  internet: false,
  recheck: false,
  signal: ""
};

const STATION = {
  SET: "SET",
  CALLSIGN: "CALLSIGN",
  NAME: "NAME",
  LOCATION: "LOCATION",
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
    case STATION.NAME:
      return { ...state, name: action.payload };
    case STATION.LOCATION:
      return { ...state, location: action.payload };
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
  const { lookupCallsign, cacheStation } = useContext(QRZSessionContext);
  const [station, stationDispatch] = useReducer(stationReducer, initialStation);
  const [stations, stationsDispatch] = useReducer(stationsReducer, []);
  const callsignRef = useRef(null);

  const resetStationForm = () => {
    stationDispatch({ type: STATION.RESET });
    callsignRef.current.focus();
  };

  const addStationToRound = () => {
    cacheStation(station);
    stationsDispatch({ type: STATIONS.ADD, payload: station });
    resetStationForm();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addStationToRound();
    }
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100px",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    float: "right",
  };
  
  return (
    <Grid
      item
      container
      justify="space-between"
      xs={12}
      spacing={2}
      component={Paper}
    >
      <Grid item container xs={10} spacing={2}>
        <Grid item xs={3}>
          <TextField
            autoFocus
            fullWidth={true}
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
        <Grid item xs={9}><Typography variant="body2">{station.name}<br />{station.location}</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth={true}
            label="Preferred Name"
            value={station.name}
            variant="outlined"
            size="small"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item xs={10}>
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
        <Grid item xs={2}>
          <Button
            style={{ float: "right" }}
            startIcon={<QueueIcon />}
            variant="contained"
            color="primary"
            onClick={addStationToRound}
            size="small"
          >
            Station
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        {station.image 
          ? <Box style={imageStyle} component="img" height={100} src={station.image} />
          : <Box style={imageStyle} component="img" height={100} src="profile.jpg" />}
      </Grid>
      <Grid item xs={12}>
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
