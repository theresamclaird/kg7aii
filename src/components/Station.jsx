import React, { useState, useContext } from 'react';
import {
  Check,
  Delete,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import {
  Backdrop,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Modal,
 } from '@mui/material';
import { QRZSessionContext } from "./QRZSession";
import Attributes from './Attributes';
import validateCallsign from "../utils/validateCallsign";
import genericProfilePicture from '../images/genericProfile.png';
import QrzStationInformation from './QrzStationInformation';

const Station = ({ station, removeStation, updateStation, sx }) => {
  const [openQrzModal, setOpenQrzModal] = useState(false);
  const [reported, setReported] = useState(() => station.reported ? ['reported'] : []);
  const [editCallSign, setEditCallSign] = useState(false);
  const [callSign, setCallSign] = useState(station.callSign);
  const { lookupCallsign } = useContext(QRZSessionContext);

  return (
    <Grid
      container
      alignItems="center"
      sx={{
        backgroundColor: station.reported ? '#eee' : 'background.paper',
        p: 1,
        ...sx,
      }}
    >
      <Grid item xs={2} sm={1}>
        <ToggleButtonGroup
          size="small"
          value={reported}
          aria-label="station has reported"
          onChange={updateStation ? (e, values) => {
            setReported(values);
            updateStation({ reported: values.includes('reported') });
          } : null}
        >
          <ToggleButton value="reported">{station.reported ? <Check /> : <CheckBoxOutlineBlank />}</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={3} sm={2}>
        {updateStation && editCallSign && (
          <TextField
            autoFocus
            value={callSign}
            size="small"
            sx={{ width: '5rem' }}
            onFocus={e => e.target.select()}
            onChange={e => setCallSign(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                if (callSign === station.callSign) {
                  setEditCallSign(false);
                  return;
                }
                if (validateCallsign(callSign)) {
                  lookupCallsign(callSign).then(qrzData => {
                    updateStation({ callSign: e.target.value, qrzData });
                  });
                  return;
                }
                updateStation({ callsign: e.target.value, qrzData: null });
              }
            }}
          />
        )}
        {!editCallSign && (
          <Typography
            onClick={updateStation ? () => setEditCallSign(true) : null}
            sx={{ minWidth: '5rem' }}
          >{station.callSign.toUpperCase()}</Typography>
        )}        
      </Grid>
      <Grid item xs={7} sm={3} md={4}>
        <Box sx={{ flexGrow: 1 }}>
          {station?.name && <Typography>{`${station.name}${station?.location && `, ${station.location}`}`}</Typography>}
        </Box>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Attributes
          attributes={station.attributes}
          setAttributes={updateStation ? attributes => updateStation({ attributes }) : () => null}
        />
      </Grid>
      <Grid item xs={4} sm={2} md={1}>
        <Box
          onClick={() => setOpenQrzModal(true)}
          component="img"
          sx={{
            cursor: 'pointer',
            maxHeight: "2rem",
            objectFit: "contain",
            float: 'right',
          }}
          src={station?.qrzData?.image || genericProfilePicture}
        />
        {station?.qrzData && (
          <Modal
            open={openQrzModal}
            onClose={() => setOpenQrzModal(false)}
            BackdropComponent={Backdrop}
          >
            <Paper
              sx={{
                position: 'absolute',
                backgroundColor: 'background.paper',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 2,
                boxShadow: 3
              }}
            >
              <QrzStationInformation {...station.qrzData} />
            </Paper>
          </Modal>
        )}
      </Grid>
      <Grid item xs={2} sm={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {removeStation && <Typography>
          <IconButton onClick={removeStation} aria-label="remove">
            <Delete />
          </IconButton>
        </Typography>}
      </Grid>
    </Grid>
  );
};

export default Station;