import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const ImageModal = ({ open, handleClose, children }) => (
<Dialog open={open} onClose={handleClose}>
    <DialogContent>
        {children}
    </DialogContent>
</Dialog>
);

export default ImageModal;
