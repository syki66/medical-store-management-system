import React, {useState, useRef} from 'react';
import {
    IconButton, TextField, Tooltip, Button, Select, FormControl, InputLabel, MenuItem,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styled from 'styled-components';

import {
    CloseButton,
    StyledButton,
    ModalContainer,
    GridContainer,
    GridDescription,
    GridInnerTitle,
    GridName,
    GridContent,
    GridInnerItem,
    GridInnerContainer,
} from '../../styles/Modal';

import { findBankIndex, generateDate, numberWithCommas } from "../../utils/functions"

import axios from "axios";
import { baseURL } from '../../variables/baseURL';

const path = "employee/";
const URL = baseURL + path;

const flexName = 4;
const flexContent = 12 - flexName;

export default function EditEmployee({ row, bankList, closeModal, setSuccessOpen, setErrorOpen }) {
    const [select, setSelect] = useState(findBankIndex(row.bank_name, bankList));
    const inputs = useRef({
        "emp_name": row.emp_name,
        "emp_joindate": row.emp_joindate,
        "emp_phone": row.emp_phone,
        "emp_address": row.emp_address,
        "emp_account_no": row.emp_account_no,
        "bank_uid": select + 1,
        "emp_salary": row.emp_salary,
        "emp_added_on": row.emp_added_on,
    });
    const [salary, setSalary] = useState({
        "sal_uid": -1,
        "sal_date": generateDate(),
        "sal_joindate": "",
        "sal_amount": "",
    });
    const [salaryArray, setSalaryArray] = useState(row.emp_salary)

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSelect = (event) => {
        const { name, value } = event.target
        setSelect(value);
        inputs.current[name] = value + 1;
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        inputs.current[id] = value;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        inputs.current.emp_salary = salaryArray;
        console.log(inputs.current)
        try {
            const res = await axios.patch(URL + row.uid + '/', inputs.current);
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

    const handleAddSalary = () => {
        if (salary.sal_joindate !== '' && salary.sal_amount !== ''){
            setSalaryArray([salary, ...salaryArray]);
            setSalary({
                ...salary,
                "sal_joindate": "",
                "sal_amount": "",
            })
        }
    }

    const handleDeleteSalary = (index) => {
        setSalaryArray(salaryArray.filter((v, i) => i != index))
    }

    const handleSalaryChange = (event, regex) => {
        const { id, value } = event.target;
        if (!regex || regex.test(value)){
            setSalary({
                ...salary,
                [id]: value
            })
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
                                id="emp_name"
                                required
                                label="Required"
                                defaultValue={row.emp_name}
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
                                type="date"
                                label="Required"
                                defaultValue={row.emp_joindate}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>Phone</GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="emp_phone"
                                required
                                label="Required"
                                defaultValue={row.emp_phone}
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
                                defaultValue={row.emp_address}
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
                                defaultValue={row.emp_account_no}
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

                        <GridInnerTitle item xs={12}>Employee Salary History</GridInnerTitle>

                        <GridInnerContainer container>
                            <GridInnerItem item xs={5.4}>
                                <TextField
                                    id="sal_joindate"
                                    size="small"
                                    // label="Date"
                                    type="date"
                                    fullWidth
                                    value={salary.sal_joindate}
                                    onChange={(event) => handleSalaryChange(event, /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </GridInnerItem>
                            <GridInnerItem item xs={0.2}>

                            </GridInnerItem>
                            <GridInnerItem item xs={5.4}>
                                <TextField
                                    id="sal_amount"
                                    size="small"
                                    label="Amount"
                                    fullWidth
                                    value={salary.sal_amount}
                                    onChange={(event) => handleSalaryChange(event, /^\d{0,9}$/)}
                                />
                            </GridInnerItem>
                            <GridPlusIcon item xs={1}>
                                <Tooltip title="Add Salary">
                                    <IconButton onClick={handleAddSalary}>
                                        <AddBoxIcon color="success" fontSize="large"/>
                                    </IconButton>
                                </Tooltip>
                            </GridPlusIcon>

                            <GridInnerItem strong="true" item xs={2}>ID</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Date</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Amount</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Add On</GridInnerItem>
                            <GridInnerItem strong="true" item xs={1}>Action</GridInnerItem>
                            {salaryArray.map((each, index) => (
                                <React.Fragment
                                    key={index}
                                >
                                    <GridInnerItem item xs={2}>{index + 1}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{each.sal_joindate.split(' ')[0]}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{numberWithCommas(each.sal_amount)}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{each.sal_date}</GridInnerItem>
                                    <GridMinusIcon item xs={1}>
                                        <Tooltip title="Delete Salary">
                                            <IconButton onClick={() => handleDeleteSalary(index)}>
                                                <IndeterminateCheckBoxIcon color="error" fontSize="medium"/>
                                            </IconButton>
                                        </Tooltip>
                                    </GridMinusIcon>
                                </React.Fragment>
                            ))}

                        </GridInnerContainer>

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
                    <Button onClick={() => handleDelete(row.uid)}>예</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const GridMinusIcon = styled(GridInnerItem)`
  && {
    padding: 0px;
  }
`

const GridPlusIcon = styled(GridInnerItem)`
  && {
    padding: 5px 0px;
  }
`