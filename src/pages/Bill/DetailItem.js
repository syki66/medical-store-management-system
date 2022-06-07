import React, { useState, useCallback, useEffect } from 'react';

import { DETAIL_DEFINE } from '../../variables/constants'

import TextField from "@material-ui/core/TextField";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function DetailItem(props) {
    const { customerBill, detailList, detailItem, idx, onChange, onDelete } = props;

    const [select] = useState();

    const [medUid, setMedUid] = useState(null);

    const handleChange = useCallback((e) => {
        if(e.target.name == DETAIL_DEFINE.MED_UID) {
            setMedUid(e.target.value);
            onChange(idx, e.target.name, e.target.value);
        } else {
            onChange(idx, e.target.name, e.target.value);
        }
    }, [onChange]);

    const handleDelete = useCallback(() => {
        onDelete(idx);
    }, [onDelete]);

    useEffect(() => {
        customerBill && customerBill.map((bill, idx) => {
            detailList && detailList.map((detailItem, idx) => {
                if(bill.med_uid == detailItem.med_uid) {
                    onChange(idx, detailItem.med_sellprice, bill.med_sellprice);
                }
            })
        })
    }, [medUid])

    return(
        <>
            <li className={'detailCon'} key={detailItem.id} >
                <TextField
                    required
                    label="SR No"
                    name={DETAIL_DEFINE.SR_NO}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    margin-right='3px'
                    value={detailItem.sr_no}
                    style={{marginRight: 1 + 'em'}}
                />
                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel>Medicine Name*</InputLabel>
                        <Select
                            required
                            name={DETAIL_DEFINE.MED_UID}
                            label="Medicine Name*"
                            onChange={(e) => handleChange(e)}
                            defaultValue=""
                            value={select}
                            margin="normal"
                            style={{marginRight: 1 + 'em', padding: 0 + 'em'}}
                            margin-right='3px'
                            padding='0px'
                        >
                            {
                                props.customerBill &&
                                props.customerBill
                                    .map((medicine, idx) => (
                                        <MenuItem key={idx} value={medicine.med_uid}>
                                            {medicine.med_name}
                                        </MenuItem>
                                    ))
                            }
                        </Select>
                </FormControl>
                <TextField
                    required
                    label="Price"
                    name={DETAIL_DEFINE.PRICE}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    style={{marginRight: 1 + 'em'}}
                    InputProps={{
                        readOnly: true,
                    }}
                    value =
                        {
                            medUid &&
                                props.customerBill &&
                                props.customerBill
                                    .filter((bill) => bill.med_uid == medUid)
                                    .map((bill) => bill.med_sellprice
                                ).toLocaleString('ko-KR')
                            ||
                            ''
                        }
                >
                </TextField>
                <TextField
                    required
                    label={"Amount"}
                    name={DETAIL_DEFINE.AMOUNT}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    value={detailItem.detail_amount}
                    style={{marginRight: 1 + 'em'}}
                />
                <RemoveCircleIcon onClick={handleDelete} className='removeBtn' />
            </li>
        </>
    )
}