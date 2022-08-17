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
  const [editCallSign, setEditCallSign] = useState(false);
  const [callSign, setCallSign] = useState(station.callSign);
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
      {editCallSign && (
        <TextField
          autoFocus
          value={callSign}
          size="small"
          sx={{ width: '7rem' }}
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
          onClick={() => setEditCallSign(true)}
          sx={{ minWidth: '7rem' }}
        >{station.callSign.toUpperCase()}</Typography>
      )}        
      <Attributes
        values={station.attributes}
        onChange={(e, attributes) => { updateStation({ attributes })}}
      />
      <Typography>
        {station?.qrzData && (
          <Link
            href={`https://www.qrz.com/db/${station?.qrzData?.call}`}
            target="_blank"
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            QRZ<OpenInNew sx={{ fontSize: '1rem', ml: 1 }} />
          </Link>
        )}
      </Typography>
      <Typography sx={{ flexGrow: 1 }}>
        {station?.qrzData && (`${station?.qrzData?.name_fmt} (${station?.qrzData?.class}): ${station.qrzData?.addr2}, ${station.qrzData?.state} (${station?.qrzData?.timezone})`)}
      </Typography>
      <Box
        onClick={() => station?.qrzData?.image && setOpenProfileImageModal(true)}
        component="img"
        sx={{
          cursor: station?.qrzData?.image ? 'pointer' : 'default',
          maxHeight: "2rem",
          objectFit: "contain",
          float: 'right',
        }}
        src={station?.qrzData?.image || genericProfilePicture}
      />
      {station?.qrzData?.image && (
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
          src={station?.qrzData?.image}
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