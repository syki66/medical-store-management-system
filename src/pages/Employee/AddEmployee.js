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

import { generateDate } from "../../utils/functions"

const path = 'employee/';
const URL = baseURL + path;

const flexName = 4;
const flexContent = 12 - flexName;

export default function AddEmployee({ bankList, closeModal, setSuccessOpen, setErrorOpen }) {
    const [select, setSelect] = useState("");
    const [inputs, setInputs] = useState({
        "emp_added_on": generateDate(),
    });

    const handleSelect = (event) => {
        const { name, value } = event.target
        setSelect(value);
        setInputs({
            ...inputs,
            [name]: value + 1
        });
        if ('bank_uid' == name) {
            setInputs({
                ...inputs,
                [name]: Object.values(bankList[value])[0]
            });
        }
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
        console.log(inputs);
        try {
            const res = await axios.post(URL, inputs);
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
                                id="emp_name"
                                required
                                label="Required"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Joining Date
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="emp_joindate"
                                required
                                // label="Required"
                                type="date"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Phone
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="emp_phone"
                                required
                                label="Required"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 50 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Address
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="emp_address"
                                required
                                label="Required"
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 15 }}
                            />
                        </GridContent>

                        <GridInnerTitle item xs={12}>
                            Employee Bank
                        </GridInnerTitle>

                        <GridName item xs={flexName}>
                            Account No.
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="emp_account_no"
                                size="small"
                                required
                                label="Required"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Bank Name
                        </GridName>
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