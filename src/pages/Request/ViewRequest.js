import React, {useState} from 'react';
import axios from 'axios';
import {IconButton, Button, Tooltip} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import {
    CloseButton,
    StyledButton,
    ModalContainer,
    GridContainer,
    GridDescription,
    GridInnerTitle,
    GridName,
    GridContent,
} from '../../styles/Modal';

import styled from 'styled-components'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const flexName = 4;
const flexContent = 12 - flexName;

export default function ViewRequest({ row, setModalState, closeModal, setSuccessOpen, setErrorOpen }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const baseURL = 'http://localhost:8000/'
    const path = "customer/req/"
    const URL = baseURL + path;

    const uid = row.req_uid

    const handleDelete = async (uid) => {
        console.log('uid', uid)
        try {
            const res = await axios.delete(URL + uid);
            console.log('uid', uid)
            console.log('URL', URL)

            if (res.request.status) {
                closeModal();
                setSuccessOpen(true);
                setConfirmOpen(false);
            } else {
                console.log(res.request.status);
                setErrorOpen(true);
            }
        } catch (error) {
            console.log(error);
            setErrorOpen(true);
        }
    }

    return(
        <>
            <ModalContainer>
                <CloseButton>
                    <Tooltip title="Close">
                        <IconButton onClick={closeModal}>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                </CloseButton>
                {row && <GridContainer container>
                    <GridInnerTitle item xs={12}>Customer Medicine Request</GridInnerTitle>
                    <GridName item xs={flexName}>Name</GridName>
                    <GridContent item xs={flexContent}>{row.req_name}</GridContent>
                    <GridName item xs={flexName}>Phone</GridName>
                    <GridContent item xs={flexContent}>{row.req_phone}</GridContent>
                    <GridName item xs={flexName}>Medicine Details</GridName>
                    <GridContent item xs={flexContent}>
                        <GridDescription>{row.req_med_detail}</GridDescription>
                    </GridContent>
                    <GridName item xs={flexName}>Added on</GridName>
                    <GridContent item xs={flexContent}>{row.req_joindate}</GridContent>
                </GridContainer>}
                <StyledButton>
                    <Button variant="contained" onClick={() => setConfirmOpen(true)}>Delete</Button>
                </StyledButton>
            </ModalContainer>

            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>삭제 확인</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        정말 삭제를 진행하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>아니오</Button>
                    <Button onClick={() => handleDelete(row.req_uid)}>예</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
