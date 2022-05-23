import React, { useState } from 'react';
import {
    IconButton,
    TextField,
    Tooltip,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

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

import { baseURL } from '../../variables/baseURL';
import { generateDate } from '../../utils/functions'

const path = "customer/req"
const URL = baseURL + path;

const flexName = 4;
const flexContent = 12 - flexName;

export default function AddRequest({ reqLength, closeModal, setSuccessOpen, setErrorOpen }) {

    const [inputs, setInputs] = useState({
        "req_uid": reqLength && reqLength + 1,
        "req_name": "",
        "req_phone" : "",
        "req_med_detail" : "",
        "req_joindate": generateDate()
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputs({
            ...inputs,
            [id]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(URL, inputs);

            if (res) {
                closeModal();
                setSuccessOpen(true);

            } else {
                console.log(res);
                setErrorOpen(true);
            }
        } catch (error) {
            console.log(error);
            setErrorOpen(true);
        }
    };

    return (
        <>
            <ModalContainer>
                <CloseButton>
                    <Tooltip title="Close">
                        <IconButton onClick={closeModal}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
                </CloseButton>
                <form onSubmit={handleSubmit}>
                    <GridContainer container>
                        <GridInnerTitle item xs={12}>
                            Add Customer Medicine
                        </GridInnerTitle>
                        <GridName item xs={flexName}>
                            Name
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="req_name"
                                required
                                label="Required"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{maxLength: 20}}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Phone
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="req_phone"
                                required
                                label="Required"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{maxLength: 20}}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Medicine Detail
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="req_med_detail"
                                required
                                label="Required"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={handleChange}
                            />
                        </GridContent>

                    </GridContainer>
                    <StyledButton>
                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                        >
                            Save
                        </Button>
                    </StyledButton>
                </form>
            </ModalContainer>
        </>
    )
}