import React, { useState } from 'react';
import {
    IconButton, TextField, Tooltip, Button, Select, FormControl, InputLabel, MenuItem,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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
import axios from "axios";
import { baseURL } from '../../variables/baseURL';

import { findBankIndex } from "../../utils/functions"

const flexName = 4;
const flexContent = 12 - flexName;

const path = "company/";
const URL = baseURL + path;

export default function EditCompany({ row, bankList, closeModal, setSuccessOpen, setErrorOpen }) {
    const [select, setSelect] = useState(findBankIndex(row.bank_name, bankList));
    const [inputs, setInputs] = useState({
        "com_uid": row.com_uid,
        "com_name": row.com_name,
        "com_licence_no": row.com_licence_no,
        "com_address": row.com_address,
        "com_contact_no": row.com_contact_no,
        "com_email": row.com_email,
        "com_description": row.com_description,
        "com_joindate": row.com_joindate,
        "com_account_no": row.com_account_no,
        "bank_uid": select + 1,
    });

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSelect = (event) => {
        const { name, value } = event.target
        setSelect(value);
        setInputs({
            ...inputs,
            [name]: value + 1
        });
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputs({
            ...inputs,
            [id]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.patch(URL + row.com_uid, inputs);
            if (res.request.status) {
                closeModal();
                setSuccessOpen(true);
            } else {
                console.log(res.request.status);
                setErrorOpen(true);
            }
        } catch (error) {
            console.log(error);
            setErrorOpen(true);
        }
    };

    const handleDelete = async (uid) => {
        try {
            const res = await axios.delete(URL + uid);
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
                <form onSubmit={handleSubmit}>
                    <GridContainer container>
                        <GridName item xs={flexName}>
                            Name
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_name"
                                required
                                label="Required"
                                defaultValue={row.com_name}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            License No.
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_licence_no"
                                required
                                label="Required"
                                defaultValue={row.com_licence_no}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>Address</GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_address"
                                required
                                label="Required"
                                defaultValue={row.com_address}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 50 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Contact No.
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_contact_no"
                                required
                                label="Required"
                                defaultValue={row.com_contact_no}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 15 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Email
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_email"
                                required
                                label="Required"
                                defaultValue={row.com_email}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 50 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Description
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_description"
                                required
                                multiline
                                rows={5}
                                label="Required"
                                defaultValue={row.com_description}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 1000 }}
                            />
                        </GridContent>
                        <GridInnerTitle item xs={12}>
                            Company Bank
                        </GridInnerTitle>

                        <GridName item xs={flexName}>
                            Account No.
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="com_account_no"
                                defaultValue={row.com_account_no}
                                size="small"
                                required
                                label="Required"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>

                        <GridName item xs={flexName}>Bank Name</GridName>
                        <GridContent item xs={flexContent}>
                            <FormControl fullWidth>
                                <InputLabel>Required *</InputLabel>
                                <Select
                                    name="bank_uid"
                                    value={select}
                                    onChange={handleSelect}
                                    required
                                    label='Required *'
                                >
                                    {bankList.map((bank, index) => (
                                        <MenuItem
                                            key={index + 1}
                                            value={index}
                                        >
                                            {bank[index + 1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridContent>
                    </GridContainer>

                    <StyledButton>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setConfirmOpen(true)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                        >
                            Save
                        </Button>
                    </StyledButton>
                </form>
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
                    <Button onClick={() => handleDelete(row.com_uid)}>예</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

