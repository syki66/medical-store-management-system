import React, {useEffect, useState, useRef, useCallback} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styled from 'styled-components';

import {useReactToPrint} from 'react-to-print';

export default function PrintBill({formRef, detailList, medList}) {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function totalAdd(detailList) {
        return detailList.map((detailItem) => {
            return detailItem.detail_amount * detailItem.price
        }).reduce((acc, cur) => acc + cur)
    }

    const totalPrice = totalAdd(detailList);

    const findMedName = useCallback((idx) => {
        for(let i=0; i<detailList.length; i++) {
            return medList.map((medItem, idx) => {
                if(medItem.med_uid == detailList[i].med_uid) {
                    return medItem.med_name;
                }
            })
        }
    }, [detailList]);


    return(
        <>
            <TableContainer component={Paper}>

                <Table
                    ref={componentRef}
                    className={'TableDiv'}
                    sx={{ minWidth: 700 }}
                    aria-label="spanning table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}} align="center" colSpan={6}>
                                Bill For Customer
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>
                                Name :
                            </TableCell>
                            <TableCell align="left">
                                {formRef.name}
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>
                                Address :
                            </TableCell>
                            <TableCell>
                                {formRef.address}
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>
                                Phone :
                            </TableCell>
                            <TableCell>
                                {formRef.phone}
                            </TableCell>

                        </TableRow>

                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}>SR No.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Medicine Name.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Qty.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Qty Type.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Unit Price.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Amount.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detailList.map((detailItem, idx) => (
                            <TableRow key={detailItem.idx}>
                                <TableCell align="left">{detailItem.sr_no}</TableCell>
                                <TableCell align="left">{findMedName(idx)}</TableCell>
                                <TableCell align="left">{detailItem.qty}</TableCell>
                                <TableCell align="left">{detailItem.qty_type}</TableCell>
                                <TableCell align="left">{detailItem.price}</TableCell>
                                <TableCell align="left">{detailItem.detail_amount}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}} colSpan={4} align="right">Total</TableCell>
                            <TableCell colSpan={2} align="center">{(totalPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <ButtonDiv>
                <Button
                    onClick={handlePrint}
                    variant="contained"
                    sx={{marginTop: "2px", padding: '1em, 3em'}}
                >
                    Print
                </Button>
            </ButtonDiv>
        </>
    )
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  padding: 1em;
`