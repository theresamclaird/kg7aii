import React, { useState, useContext } from 'react';
import {
  Check,
  Delete,
  OpenInNew,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import {
  Box,
  Link,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
 } from '@mui/material';
 import { QRZSessionContext } from "../QRZSession";
 import ImageModal from '../ImageModal';
import Attributes from '../Attributes';
import validateCallsign from "../../utils/validateCallsign";
import genericProfilePicture from '../../images/genericProfile.png';

const Station = ({ station, removeStation, updateStation, style }) => {
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
  const [reported, setReported] = useState(() => station.reported ? ['reported'] : []);
  const [editCallsign, setEditCallsign] = useState(false);
  const [callsign, setCallsign] = useState(station.callsign);
  const { lookupCallsign } = useContext(QRZSessionContext);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 2,
      p: 1,
      backgroundColor: station.reported ? '#eee' : 'transparent',
      ...style
    }}>
      <ToggleButtonGroup
        size="small"
        value={reported}
        aria-label="station has reported"
        onChange={(e, values) => {
          setReported(values);
          updateStation({ reported: values.includes('reported') });
        }}
      >
        <ToggleButton value="reported">{station.reported ? <Check /> : <CheckBoxOutlineBlank />}</ToggleButton>
      </ToggleButtonGroup>
      {editCallsign && (
        <TextField
          autoFocus
          value={callsign}
          size="small"
          sx={{ width: '7rem' }}
          onFocus={e => e.target.select()}
          onChange={e => setCallsign(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (callsign === station.callsign) {
                setEditCallsign(false);
                return;
              }
              if (validateCallsign(callsign)) {
                lookupCallsign(callsign).then(qrzData => {
                  updateStation({ callsign: e.target.value, qrz: qrzData });
                });
                return;
              }
              updateStation({ callsign: e.target.value, qrz: null });
            }
          }}
        />
      )}
      {!editCallsign && (
        <Typography
          onClick={() => setEditCallsign(true)}
          sx={{ minWidth: '7rem' }}
        >{station.callsign.toUpperCase()}</Typography>
      )}        
      <Attributes
        values={station.attributes}
        onChange={(e, attributes) => { updateStation({ attributes })}}
      />
      <Typography>
        {station?.qrz && (
          <Link
            href={`https://www.qrz.com/db/${station?.qrz?.call}`}
            target="_blank"
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            QRZ<OpenInNew sx={{ fontSize: '1rem', ml: 1 }} />
          </Link>
        )}
      </Typography>
      <Typography sx={{ flexGrow: 1 }}>
        {station?.qrz && (`${station?.qrz?.name_fmt} (${station?.qrz?.class}): ${station.qrz?.addr2}, ${station.qrz?.state} (${station?.qrz?.timezone})`)}
      </Typography>
      <Box
        onClick={() => station?.qrz?.image && setOpenProfileImageModal(true)}
        component="img"
        sx={{
          cursor: station?.qrz?.image ? 'pointer' : 'default',
          maxHeight: "2rem",
          objectFit: "contain",
          float: 'right',
        }}
        src={station?.qrz?.image || genericProfilePicture}
      />
      {station?.qrz?.image && (
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
      )}
      <Typography>
        <IconButton onClick={removeStation} aria-label="remove">
          <Delete />
        </IconButton>
      </Typography>
    </Box>
  );
};

export default Station;