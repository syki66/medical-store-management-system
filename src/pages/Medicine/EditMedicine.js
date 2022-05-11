import React, {useState, useRef, useEffect} from 'react';
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

import { findBankIndex } from "../../utils/functions"

import axios from "axios";
import { baseURL } from '../../variables/baseURL';

const path = "medicine/";
const URL = baseURL + path;

const flexName = 4;
const flexContent = 12 - flexName;

export default function EditMedicine({ row, companyList, closeModal, setSuccessOpen, setErrorOpen }) {
    const [select, setSelect] = useState(findBankIndex(row.med_company, companyList));
    const inputs = useRef({
        "med_uid": row.med_uid,
        "med_name": row.med_name,
        "med_type": row.med_type,
        "med_buyprice": row.med_buyprice,
        "med_sellprice": row.med_sellprice,
        "med_cgst": row.med_cgst,
        "med_sgst": row.med_sgst,
        "med_expire": row.med_expire,
        "med_mfg": row.med_mfg,
        "med_desc": row.med_desc,
        "med_instock": row.med_instock,
        "med_qty": row.med_qty,
        "med_company": row.med_company,
        "med_salt": row.med_salt,

        // "bank_uid": select,
    });
    const [salt, setSalt] = useState({
        "salt_uid": -1,
        "salt_name": "",
        "salt_qty": "",
        "salt_qty_type": "",
        "salt_desc": "",
    });
    const [saltArray, setSaltArray] = useState(row.med_salt)

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSelect = (event) => {
        const { name, value } = event.target
        setSelect(value);
        inputs.current[name] = companyList[value][value + 1];
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        inputs.current[id] = value;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        inputs.current.med_salt = saltArray;
        console.log(inputs.current)
        try {
            const res = await axios.patch(URL + row.med_uid, inputs);
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

    const handleAddDetail = () => {
        setSaltArray([salt, ...saltArray]);
        setSalt({
            ...salt,
            "salt_name": "",
            "salt_qty": "",
            "salt_qty_type": "",
            "salt_desc": "",
        })
    }

    const handleDeleteDetail = (index) => {
        setSaltArray(saltArray.filter((v, i) => i != index))
    }

    const handleDetailChange = (event) => {
        const { id, value } = event.target;
        setSalt({
            ...salt,
            [id]: value
        })
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
                                id="med_name"
                                required
                                label="Required"
                                defaultValue={row.med_name}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Medicine Type
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_type"
                                required
                                label="Required"
                                defaultValue={row.med_type}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>Buy Price</GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_buyprice"
                                required
                                label="Required"
                                defaultValue={row.med_buyprice}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 50 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Sell Price
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_sellprice"
                                required
                                label="Required"
                                defaultValue={row.med_sellprice}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 15 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            C GST
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_cgst"
                                required
                                label="Required"
                                defaultValue={row.med_cgst}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            S GST
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_sgst"
                                required
                                label="Required"
                                defaultValue={row.med_sgst}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Expire Date
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_expire"
                                type="date"
                                required
                                label="Required"
                                defaultValue={row.med_expire}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Mfg Date
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_mfg"
                                type="date"
                                required
                                label="Required"
                                defaultValue={row.med_mfg}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Description
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_desc"
                                required
                                label="Required"
                                defaultValue={row.med_desc}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            In Stock Total
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_instock"
                                required
                                label="Required"
                                defaultValue={row.med_instock}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>
                        <GridName item xs={flexName}>
                            Qty in Strip
                        </GridName>
                        <GridContent item xs={flexContent}>
                            <TextField
                                id="med_qty"
                                required
                                label="Required"
                                defaultValue={row.med_qty}
                                size="small"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ maxLength: 20 }}
                            />
                        </GridContent>

                        <GridName item xs={flexName}>Company</GridName>
                        <GridContent item xs={flexContent}>
                            <FormControl fullWidth>
                                <InputLabel>Required *</InputLabel>
                                <Select
                                    name="med_company"
                                    value={select}
                                    onChange={handleSelect}
                                    required
                                    label='Required *'
                                >
                                    {companyList.map((company, index) => (

                                        <MenuItem
                                            key={index + 1}
                                            value={index}
                                        >
                                            {company[index + 1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </GridContent>

                        <GridInnerTitle item xs={12}>Medicine Detail</GridInnerTitle>

                        <GridInnerContainer container>
                            <GridInnerItem item xs={2.6}>
                                <TextField
                                    id="salt_name"
                                    size="small"
                                    label="Salt Name"
                                    fullWidth
                                    value={salt.salt_name}
                                    onChange={handleDetailChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </GridInnerItem>
                            <GridInnerItem item xs={0.2} />
                            <GridInnerItem item xs={2.6}>
                                <TextField
                                    id="salt_qty"
                                    size="small"
                                    label="Salt Qty"
                                    fullWidth
                                    value={salt.salt_qty}
                                    onChange={handleDetailChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </GridInnerItem>
                            <GridInnerItem item xs={0.2} />
                            <GridInnerItem item xs={2.6}>
                                <TextField
                                    id="salt_qty_type"
                                    size="small"
                                    label="Salt Qty Type"
                                    fullWidth
                                    value={salt.salt_qty_type}
                                    onChange={handleDetailChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </GridInnerItem>
                            <GridInnerItem item xs={0.2} />
                            <GridInnerItem item xs={2.6}>
                                <TextField
                                    id="salt_desc"
                                    size="small"
                                    label="Salt Description"
                                    fullWidth
                                    value={salt.salt_desc}
                                    onChange={handleDetailChange}
                                    inputProps={{ maxLength: 20 }}
                                />
                            </GridInnerItem>
                            <GridPlusIcon item xs={1}>
                                <Tooltip title="Add Detail">
                                    <IconButton onClick={handleAddDetail}>
                                        <AddBoxIcon color="success" fontSize="large"/>
                                    </IconButton>
                                </Tooltip>
                            </GridPlusIcon>

                            <GridInnerItem strong="true" item xs={2}>Salt Name</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Salt Qty</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Salt Qty Type</GridInnerItem>
                            <GridInnerItem strong="true" item xs={3}>Salt Description</GridInnerItem>
                            <GridInnerItem strong="true" item xs={1}>Action</GridInnerItem>
                            {saltArray.map((each, index) => (
                                <>
                                    <GridInnerItem item xs={2}>{each.salt_name}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{each.salt_qty}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{each.salt_qty_type}</GridInnerItem>
                                    <GridInnerItem item xs={3}>{each.salt_desc}</GridInnerItem>
                                    <GridMinusIcon item xs={1}>
                                        <Tooltip title="Delete Detail">
                                            <IconButton onClick={() => handleDeleteDetail(index)}>
                                                <IndeterminateCheckBoxIcon color="error" fontSize="medium"/>
                                            </IconButton>
                                        </Tooltip>
                                    </GridMinusIcon>
                                </>
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
                    <Button onClick={() => handleDelete(row.med_uid)}>예</Button>
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