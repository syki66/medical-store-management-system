import React, {useState, useEffect, useContext, useCallback} from "react";
import axios from "axios";

import ViewRequest from "./ViewRequest";
import AddRequest from "./AddRequest";
import {baseURL} from "../../variables/baseURL";

import styled from "styled-components";

import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from '@mui/material/Checkbox';

import Stack from "@mui/material/Stack";
import {Modal, Snackbar, Alert} from "@mui/material";

export default function Request() {
    const [rows, setRows] = useState([]);
    const [length, setLength] = useState(0);

    const [currPage, setCurrPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [modalState, setModalState] = useState('view');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRow, setModalRow] = useState([]);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const path = "customer/req?page="
    const URL = baseURL + path;

    const pageCount = 10;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const getData = async (URL, page) => {
        try{
            const response = await axios.get(URL + page);
            console.log('request response', response)
            const resData = response.data;
            setRows(resData.request_list);
            setLength(resData.requestallcount);
            setMaxPage(Math.ceil(resData.requestallcount / pageCount));
            setCurrPage(page);
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = async (row) => {
        try{
            const response = await axios.patch(`${baseURL}customer/req/${row.req_uid}`);
            console.log('patch 성공 response', response)

        } catch (error) {
            console.log(error);
        }
    }

    const openModal = (state, row) => {
        console.log('모달창 오픈')
        setModalRow(row);
        setModalState(state);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const selectModal = (state, row) => {
        if (state === 'add') {
            return <AddRequest
                length={length}
                closeModal = {closeModal}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        } else
            if (state === 'view') {
            return <ViewRequest
                rows ={rows}
                row = {row}
                closeModal = {closeModal}
                setModalState = {setModalState}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        }
    }

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
    };

    const handlePagi = (event, page) => {
        getData(URL, page);
    }

    const init = () => {
        if (rows.length === 0) {
            getData(URL, 1);
            setCurrPage(1);
        } else {
            getData(URL, currPage);
        }
    }

    useEffect(() => {
            init();
        }, [
            successOpen,
            maxPage,
        ]
    );

    useEffect(() => {
        getData()
    },[rows])

    return (
        <>
        <InnerContainer>
            <TitleContainer>
                <div>All Customer Medicine Request</div>
                <div>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => openModal('add')}
                    >
                        Add
                    </Button>
                </div>
            </TitleContainer>
        <TableContainer component={Paper}>
            <Table sx={{width:'100%'}}>
                <TableHead>
                    <TableRow>
                        <StyledCell>Id</StyledCell>
                        <StyledCell>Name</StyledCell>
                        <StyledCell>Phone</StyledCell>
                        <StyledCell>Medicine Details</StyledCell>
                        <StyledCell>Status</StyledCell>
                        <StyledCell>Added On</StyledCell>
                        <StyledCell>Action</StyledCell>
                        <StyledCell>More</StyledCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row, index) => (
                        <TableRow
                            key={row.req_uid}
                        >
                            <StyledCell component="th" scope="row">{(currPage * pageCount - pageCount) + (index + 1)}</StyledCell>
                            <StyledCell>{row.req_name}</StyledCell>
                            <StyledCell>{row.req_phone}</StyledCell>
                            <StyledCell>{row.req_med_detail}</StyledCell>
                            <StyledCell>
                                {
                                    row.req_status ? <p>Uncomplete</p> : <p>Completed</p>
                                }
                            </StyledCell>
                            <StyledCell width='150px'>{row.req_joindate}</StyledCell>
                            <StyledCell>
                                {
                                    row.req_status ? <Checkbox {...label} onClick={() => handleStatus(row)} /> : <Checkbox {...label} disabled checked />
                                }
                            </StyledCell>
                            <StyledCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => openModal('view', row)}
                                >
                                    View
                                </Button>
                            </StyledCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <StyledPagination count={maxPage} onChange={handlePagi} page={currPage} color="primary" />

        </InnerContainer>

        <StyledModal
            open={modalOpen}
            onClose={closeModal}
        >
            <>
                {selectModal(modalState, modalRow)}
            </>
        </StyledModal>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={successOpen} autoHideDuration={3000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                        성공적으로 처리 되었습니다.
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorOpen} autoHideDuration={3000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
                        오류가 발생하였습니다.
                    </Alert>
                </Snackbar>
            </Stack>
    </>
    )
}


const InnerContainer = styled.div`
  background-color: #d9d9d9;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 15px;
  div:nth-child(1){
    font-weight: 600;
    font-size: xx-large;
  };
  div:nth-child(2){
    text-align: right;
  };
`;

const Cell = styled.div`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: ${props => props.width};
`;

const StyledCell = ({ children, width }) => {
    return (
        <TableCell>
            <Cell width={width}>{children}</Cell>
        </TableCell>
    );
}

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
