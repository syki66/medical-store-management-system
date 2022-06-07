import React, { useRef } from 'react';

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

export default function PrintBill({customerInfoRef, detailList, customerBill}) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const getTotalPrice = (detailList) => {
        return customerBill && customerBill.map((bill) => {
            return detailList && detailList.filter((detailItem) => bill.med_uid == detailItem.med_uid)
                .map((detailItem) => bill.med_sellprice * detailItem.detail_amount )
                .reduce((acc, cur) => acc + cur, 0);
        })
        .reduce((acc, cur) => acc + cur, 0);
    }

    const totalPrice = getTotalPrice(detailList);

    return(
        <>
            <TableContainer component={Paper}>
                    <Table
                    ref={componentRef}
                    className={'TableDiv'}
                    sx={{minWidth: 700}}
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
                                {customerInfoRef.name}
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>
                                Address :
                            </TableCell>
                            <TableCell align="left">
                                {customerInfoRef.address}
                            </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>
                                Phone :
                            </TableCell>
                            <TableCell align="left">
                                {customerInfoRef.phone}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}} colSpan={1}>SR No.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} colSpan={2}>Medicine Name.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} colSpan={2}>Price.</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}} colSpan={1}>Amount.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detailList.map((detailItem, idx) => (
                            <TableRow key={detailItem.med_uid}>
                                <TableCell align="left" colSpan={1}>{detailItem.sr_no}</TableCell>
                                <TableCell align="left" colSpan={2}>
                                    {
                                        customerBill &&
                                        customerBill.map((medItem) => {
                                            if (medItem.med_uid == detailItem.med_uid) {
                                                return <TableCell align="left"
                                                                  key={medItem.med_uid}>{medItem.med_name}</TableCell>
                                            }
                                        })
                                    }
                                </TableCell>
                                <TableCell align="left" colSpan={2}>
                                    {
                                        customerBill &&
                                        customerBill.map((bill) => {
                                            if (bill.med_uid == detailItem.med_uid) {
                                                return <TableCell align="left"
                                                                  key={bill.med_uid}>{bill.med_sellprice.toLocaleString('ko-KR')}</TableCell>
                                            }
                                        })
                                    }
                                </TableCell>
                                <TableCell align="left" colSpan={1}>{detailItem.detail_amount}</TableCell>
                            </TableRow>
                        ))}
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}} colSpan={3} align="right">Total</TableCell>
                                <TableCell colSpan={3} align="center">{totalPrice.toLocaleString('ko-KR')}</TableCell>
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