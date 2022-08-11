import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageModal from '../ImageModal';

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
          label="↩️"
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
          label="🚗"
        />
      </Box>
      <Typography sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '2rem' }}>
        <Box>{station?.qrz?.name_fmt}</Box>
        <Box>{`${station.qrz?.addr2}, ${station.qrz?.state}`}</Box>
        <Box>{`(${station?.qrz?.timezone})`}</Box>
      </Typography>
      {station?.qrz?.image && (
        <>
          <Box
            onClick={() => setOpenProfileImageModal(true)}
            component="img"
            style={{
              cursor: 'pointer',
              maxHeight: "2rem",
              objectFit: "contain",
              float: 'right',
            }}
            src={station?.qrz?.image}
          />
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
        </>
      )}
      <Typography>
        <IconButton
          onClick={removeStation}
          aria-label="remove"
        >
          <DeleteIcon />
        </IconButton>
      </Typography>
    </Box>
  );
};

export default Station;