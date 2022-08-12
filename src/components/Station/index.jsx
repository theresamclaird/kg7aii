import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Link, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Check, Delete, DirectionsCar, Autorenew, OpenInNew } from '@mui/icons-material';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageModal from '../ImageModal';
import genericProfilePicture from '../../images/genericProfile.png';

const Station = ({ station, removeStation, updateStation, style }) => {
  const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '1rem', 
      margin: '0.25rem 0.5rem',
      ...style
    }}>
      <Box style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
        minWidth: '12rem',
      }}>
        <FormControlLabel
          label={<Check sx={{ verticalAlign: 'middle' }} />}
          control={
            <Checkbox
              checked={station.reported}
              onChange={e => updateStation({ reported: e.target.checked })}
              name="reported"
              color="primary"
            />
          }
        />
        <Typography style={{ minWidth: '5rem' }}>{station.callsign.toUpperCase()}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={station.inAndOut}
              onChange={e => updateStation({ inAndOut: e.target.checked })}
              name="inAndOut"
              color="primary"
            />
          }
          label={<Autorenew sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={station.mobile}
              onChange={e => updateStation({ mobile: e.target.checked })}
              name="mobile"
              color="primary"
            />
          }
          label={<DirectionsCar sx={{ fontSize: '1rem', verticalAlign: 'middle' }} />}
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
            QRZ <OpenInNew sx={{ fontSize: '1rem', ml: 1 }} />
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