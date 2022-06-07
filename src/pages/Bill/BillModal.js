import React, {useState} from 'react';
import Box from "@mui/material/Box";
import PrintBill from "./PrintBill";
import Modal from "@mui/material/Modal";

const BillModal = ({ customerBill, customerInfoRef, detailList, open, handleClose }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <PrintBill
                    customerInfoRef={customerInfoRef}
                    detailList={detailList}
                    customerBill={customerBill}
                />
            </Box>
        </Modal>
    )
}

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default BillModal;