import React from 'react';
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

const flexName = 4;
const flexContent = 12 - flexName;

export default function ViewCompany({ row, setModalState, closeModal }) {

    return (
        <>
            <ModalContainer>
                <CloseButton>
                    <Tooltip title="Close">
                        <IconButton onClick={closeModal}>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                </CloseButton>
                <GridContainer container>
                    <GridName item xs={flexName}>Name</GridName>
                    <GridContent item xs={flexContent}>{row.com_name}</GridContent>
                    <GridName item xs={flexName}>License No.</GridName>
                    <GridContent item xs={flexContent}>{row.com_licence_no}</GridContent>
                    <GridName item xs={flexName}>Address</GridName>
                    <GridContent item xs={flexContent}>{row.com_address}</GridContent>
                    <GridName item xs={flexName}>Contact No.</GridName>
                    <GridContent item xs={flexContent}>{row.com_contact_no}</GridContent>
                    <GridName item xs={flexName}>Email</GridName>
                    <GridContent item xs={flexContent}>{row.com_email}</GridContent>
                    <GridName item xs={flexName}>Description</GridName>
                    <GridContent item xs={flexContent}>
                        <GridDescription>{row.com_description}</GridDescription>
                    </GridContent>
                    <GridInnerTitle item xs={12}>Company Bank</GridInnerTitle>
                    <GridName item xs={flexName}>Account No.</GridName>
                    <GridContent item xs={flexContent}>{row.com_account_no}</GridContent>
                    <GridName item xs={flexName}>Bank Name</GridName>
                    <GridContent item xs={flexContent}>{row.bank_name}</GridContent>
                </GridContainer>
                <StyledButton>
                    <Button variant="contained" onClick={() => setModalState('edit')}>Edit</Button>
                </StyledButton>
            </ModalContainer>
        </>
    )
}

