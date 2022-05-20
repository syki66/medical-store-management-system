import React, { useState, useCallback, useEffect, useRef } from 'react';
import TextField from "@material-ui/core/TextField";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';

const DETAIL_DEFINE = {
    SR_NO:"sr_no",
    MED_UID:"med_uid",
    QTY:"qty",
    QTY_TYPE:"qty_type",
    PRICE:'price',
    AMOUNT:'detail_amount'
};

export default function DetailItem(props) {
    const {medList, detailItem, idx, onChange, onDelete } = props;

    const [select, setSelect] = useState();

    const handleChange = useCallback((e) => {
        onChange(idx, e.target.name, e.target.value);
    }, [onChange]);

    const handleDelete = useCallback(() => {
        onDelete(idx);
    }, [onDelete]);


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
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {  width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    {props.medList &&
                        <TextField
                        required
                        select
                        label="Medicine Name"
                        name={DETAIL_DEFINE.MED_UID}
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        margin-right='3px'
                        style={{marginRight: 1 + 'em'}}
                        defaultValue=""
                        value={select}
                    >
                        {props.medList && props.medList.map((medicine, idx) => (
                            <option key={idx} value={medicine.med_uid}>
                                {medicine.med_name}
                            </option>
                        ))}
                    </TextField>}




                </Box>
                <TextField
                    required
                    label="Qty"
                    name={DETAIL_DEFINE.QTY}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    value={detailItem.qty}
                    style={{marginRight: 1 + 'em'}}
                />
                <TextField
                    required
                    label="Qty Type"
                    name={DETAIL_DEFINE.QTY_TYPE}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    value={detailItem.qty_type}
                    style={{marginRight: 1 + 'em'}}
                />
                <TextField
                    required
                    label="Unit Price"
                    name={DETAIL_DEFINE.PRICE}
                    onChange={(e) => handleChange(e)}
                    className='textField'
                    margin="normal"
                    value={detailItem.price}
                    style={{marginRight: 1 + 'em'}}
                />
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