import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const ImageModal = ({ open, handleClose, children }) => (
<Dialog style={{ padding: 0, margin: 0 }} open={open} onClose={handleClose}>
    <DialogContent style={{ padding: 0, margin: 0 }}>
        {children}
    </DialogContent>
</Dialog>
);

export default ImageModal;
