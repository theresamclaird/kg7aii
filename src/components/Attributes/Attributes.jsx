import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
    DirectionsCar,
    Announcement,
    Autorenew,
    Cloud,
} from '@mui/icons-material';
  
const Attributes = ({ values, onChange, onKeyPress }) => {
    return (
        <ToggleButtonGroup
        size="small"
        value={values}
        aria-label="in-and-out and mobile attributes"
        onChange={(e, attributes) => onChange(e, attributes)}
        onKeyPress={onKeyPress}
      >
        <ToggleButton
            value="inAndOut"
            aria-label="in-and-out"
        >
            I/O
        </ToggleButton>
        <ToggleButton
            value="mobile"
            aria-label="mobile"
        >
            <DirectionsCar />
        </ToggleButton>
        <ToggleButton
            value="internet"
            aria-label="internet"
        >
            <Cloud />
        </ToggleButton>
        <ToggleButton
            value="recheck"
            aria-label="recheck"
        >
            <Autorenew />
        </ToggleButton>
        <ToggleButton
            value="comment"
            aria-label="comment"
        >
            <Announcement />
        </ToggleButton>
      </ToggleButtonGroup>
    );
};

export default Attributes;