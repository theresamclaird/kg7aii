import React, { useState } from 'react';
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
 } from '@mui/material';
import ImageModal from '../ImageModal';
import Attributes from '../Attributes';
import genericProfilePicture from '../../images/genericProfile.png';

const Station = ({ station, removeStation, updateStation, style }) => {
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
  const [reported, setReported] = useState(() => station.reported ? ['reported'] : []);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 1,
      p: 1,
      backgroundColor: station.reported || station.attributes.includes('inAndOut') ? '#eee' : 'transparent',
      ...style
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1,
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
        <Typography style={{ minWidth: '5rem' }}>{station.callsign.toUpperCase()}</Typography>
        <Attributes
          values={station.attributes}
          onChange={(e, attributes) => { updateStation({ attributes })}}
        />
      </Box>
      <Typography sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '2rem' }}>
        {station?.qrz && (
          <>
          <Link
            href={`https://www.qrz.com/db/${station?.qrz?.call}`}
            target="_blank"
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            QRZ<OpenInNew sx={{ fontSize: '1rem', ml: 1 }} />
          </Link>
          {`${station?.qrz?.name_fmt} (${station?.qrz?.class}): ${station.qrz?.addr2}, ${station.qrz?.state} (${station?.qrz?.timezone})`}
          </>
        )}
      </Typography>
      <Box
        onClick={() => station?.qrz?.image && setOpenProfileImageModal(true)}
        component="img"
        style={{
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
        <IconButton
          onClick={removeStation}
          aria-label="remove"
        >
          <Delete />
        </IconButton>
      </Typography>
    </Box>
  );
};

export default Station;