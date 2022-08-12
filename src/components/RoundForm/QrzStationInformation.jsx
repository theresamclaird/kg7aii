import React from "react";
import { Grid, Typography, Link } from "@mui/material";
import { OpenInNew } from '@mui/icons-material';

const QrzStationInformation = ({
    name_fmt,
    expdate,
    email,
    call,
    timezone,
    grid,
    addr2,
    state,
    country,
    lat,
    lon,
    image,
    ...qrz }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography variant="body2">
                    {`${name_fmt} (${qrz?.class})`}<br />
                    {`Expires: ${expdate}`}<br />
                    {<Link href={`mailto:${email}`}>{email} <OpenInNew sx={{ fontSize: '1rem', verticalAlign: 'middle'}} /></Link>}<br />
                    {call && <Link href={`https://www.qrz.com/db/${call}`} target="_blank">QRZ <OpenInNew sx={{ fontSize: '1rem', verticalAlign: 'middle'}} /></Link>}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2">
                    {`Timezone: ${timezone}`}<br />
                    {`Grid: ${grid}`}<br />
                    {`${addr2} ${state}`}<br />
                    {country}<br />
                    {<Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}>{`${lat}, ${lon}`} <OpenInNew sx={{ fontSize: '1rem', verticalAlign: 'middle'}} /></Link>}<br />
                </Typography>
            </Grid>
        </Grid>
    );
};

export default QrzStationInformation;