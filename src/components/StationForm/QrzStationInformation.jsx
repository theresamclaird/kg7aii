import React, { useState, useRef } from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { OpenInNew } from '@mui/icons-material';
import genericProfilePicture from '../../images/genericProfile.png';
import ImageModal from '../ImageModal';
import { useEffect } from "react";

function calcTime(offset) { // todo This does not account for DST.
    const newDate = new Date();
    const utc = newDate.getTime() + (newDate.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleTimeString(Navigator?.languages?.[0] || 'en-US', { hour12: false });
}

const QrzStationInformation = ({
    name_fmt,
    aliases,
    expdate,
    email,
    call,
    timezone,
    grid,
    addr1,
    addr2,
    state,
    zip,
    country,
    county,
    lat,
    lon,
    u_views,
    gmtoffset,
    image,
    ...qrz }) => {
        const [openProfileImageModal, setOpenProfileImageModal] = useState(false);
        const timeRef = useRef(null);

        useEffect(() => {
            const intervalId = setInterval(() => {
                if (timeRef.current) {
                    timeRef.current.innerText = `Timezone: ${timezone} (${calcTime(gmtoffset)})`;
                }
            }, 1000);
            return () => clearInterval(intervalId);
        });

        return (
        <Grid container spacing={1}>
            <Grid item xs={12}><Typography variant="subtitle1">QRZ Lookup:</Typography></Grid>
            <Grid item xs={3}>
                <Box
                    onClick={() => image && setOpenProfileImageModal(true)}
                    as="img"
                    sx={{
                        cursor: image ? 'pointer' : 'default',
                        width: '100%',
                        maxHeight: '13rem',
                        objectFit: "contain",
                        m: 0,
                        p: 0,
                    }}
                    src={image || genericProfilePicture}
                />
                {image && (
                    <ImageModal open={openProfileImageModal} handleClose={() => setOpenProfileImageModal(false)}>
                        <Box sx={{ width: '100%' }} as="img" src={image} />
                    </ImageModal>
                )}
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2">{`${name_fmt} ${qrz?.class ? `(${qrz?.class})` : ''}`}</Typography>
                {aliases && <Typography variant="body2">{`Aliases: ${aliases}`}</Typography>}
                {addr1 && <Typography variant="body2">{addr1}</Typography>}
                {addr2 && <Typography variant="body2">{`${addr2} ${state ? state : ''} ${zip ? zip : ''}`}</Typography>}
                {county && <Typography variant="body2">{`County: ${county}`}</Typography>}
                {country && <Typography variant="body2">{country}</Typography>}
                {grid && <Typography variant="body2">{`Grid: ${grid}`}</Typography>}
                {lat && lon && <Typography variant="body2"><Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}>{`${lat}, ${lon}`} <OpenInNew sx={{ fontSize: '1rem', verticalAlign: 'middle'}} /></Link></Typography>}
            </Grid>
            <Grid item xs={5}>
                {expdate && expdate !== '0000-00-00' && <Typography variant="body2">{`Expires: ${expdate}`}</Typography>}
                {timezone && gmtoffset && <Typography variant="body2" ref={timeRef}>{`Timezone: ${timezone} (${calcTime(gmtoffset)})`}</Typography>}
                {u_views && <Typography variant="body2">{`${u_views} views`}</Typography>}
                {email && <Typography variant="body2"><Link href={`mailto:${email}`}>{email}</Link></Typography>}
                {call && <Typography variant="body2"><Link href={`https://www.qrz.com/db/${call}`} target="_blank">QRZ <OpenInNew sx={{ fontSize: '1rem', verticalAlign: 'middle'}} /></Link></Typography>}
            </Grid>
        </Grid>
    );
};

export default QrzStationInformation;