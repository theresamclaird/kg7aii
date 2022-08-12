import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

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
                    {<a href={`mailto:${email}`}>{email}</a>}<br />
                    {call && <a href={`https://www.qrz.com/db/${call}`} target="_blank">QRZ Link</a>}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2">
                    {`Timezone: ${timezone}`}<br />
                    {`Grid: ${grid}`}<br />
                    {`${addr2} ${state}`}<br />
                    {country}<br />
                    {<a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}>{`${lat}, ${lon}`}</a>}<br />
                </Typography>
            </Grid>
        </Grid>
    );
};

export default QrzStationInformation;