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
};

const stationsReducer = (stations, action) => {
  switch (action.type) {
    case STATIONS.REMOVE:
      return stations.filter((station, index) => index !== action.payload.index);
    case STATIONS.ADD:
      return [...stations, { guid: v4(), ...action.payload }];
    case STATIONS.RESET:
      return [];
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
      container
      justify="space-between"
      spacing={3}
      component={Paper}
      style={{ marginBottom: '1rem' }}
    >
      <Grid container item xs={6} spacing={1}>
        <Grid item xs={12}>
          <FormGroup
            row
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
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
          </FormGroup>
        </Grid>
        {station?.qrz &&
          <Grid item container xs={12}>
            <Grid item xs={6}>
              {station?.qrz &&
                <Typography
                  variant="body2"
                  style={{
                    marginLeft: '0.5rem',
                  }}
                >
                  {`${station.qrz?.name_fmt} (${station.qrz.class})`}<br />
                  {`Expires: ${station.qrz?.expdate}`}<br />
                  {<a href={`mailto:${station.qrz?.email}`}>{station.qrz?.email}</a>}<br />
                  {station.qrz?.call && <a href={`https://www.qrz.com/db/${station.qrz.call}`} target="_blank">QRZ Link</a>}
                </Typography>
              }
            </Grid>
            <Grid item xs={6}>
            {station?.qrz && <Typography
                variant="body2"
                style={{
                  marginLeft: '0.5rem',
                }}
              >
                {`Timezone: ${station.qrz?.timezone}`}<br />
                {`Grid: ${station.qrz?.grid}`}<br />
                {`${station.qrz?.addr2} ${station.qrz?.state}`}<br />
                {station.qrz?.country}<br />
                {<a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${station.qrz?.lat},${station.qrz?.lon}`}>{`${station.qrz?.lat}, ${station.qrz?.lon}`}</a>}<br />
              </Typography>}
            </Grid>
          </Grid>
        }
      </Grid>
      <Grid item xs={6} style={{ height: '11rem' }}>
        {station?.qrz?.image && <Box
          onClick={() => setOpenProfileImageModal(true)}
          component="img"
          style={{
            border: 'solid 2px black',
            cursor: 'pointer',
            maxHeight: "10rem",
            objectFit: "contain",
            float: 'right',
          }}
          src={station?.qrz?.image}
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
            src={station?.qrz?.image}
          />
        </ImageModal>
      </Grid>
      <Grid item xs={12}> {/* round */}
        <Round
          number={number}
          stations={stations}
          removeStation={index => stationsDispatch({ type: STATIONS.REMOVE, payload: { index }})} />
      </Grid>
      {stations.length > 0 && (
        <Grid item container xs={12}>
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