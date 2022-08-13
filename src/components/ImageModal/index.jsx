import React from "react";
import { Dialog, DialogContent } from '@mui/material';

const ImageModal = ({ open, handleClose, children }) => (
<Dialog open={open} onClose={handleClose}>
    <DialogContent>
        {children}
    </DialogContent>
</Dialog>
);

export default ImageModal;
