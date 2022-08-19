import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
    DirectionsCar,
    Comment,
    Language,
    PublishedWithChanges,
} from '@mui/icons-material';
  
const LogAttributes = ({ attributes, setAttributes }) => {
    return (
        <ToggleButtonGroup
            color="primary"
            size="small"
            value={attributes}
            aria-label="in-and-out and mobile attributes"
            onChange={(e, updatedAttributes) => setAttributes(updatedAttributes)}
            onKeyPress={e => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Enter is handled by the calling component.
                }
            }}
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
            <Language />
        </ToggleButton>
        <ToggleButton
            value="recheck"
            aria-label="recheck"
        >
            <PublishedWithChanges />
        </ToggleButton>
        <ToggleButton
            value="comment"
            aria-label="comment"
        >
            <Comment />
        </ToggleButton>
      </ToggleButtonGroup>
    );
};

export default LogAttributes;