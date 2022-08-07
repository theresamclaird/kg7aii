import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ImageModal from '../ImageModal';

const Station = ({ station, removeStation, style }) => {
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
        gap: '1rem',
        minWidth: '12rem',
      }}>
        <Typography style={{ minWidth: '5rem' }}>{station.callsign.toUpperCase()}</Typography>
        <Typography>{station.inAndOut && <>🔃</>}</Typography>
        <Typography>{station.mobile && <>🚗</>}</Typography>
      </Box>
      <Typography style={{ flex: 1 }}>{station?.qrz?.name_fmt}</Typography>
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