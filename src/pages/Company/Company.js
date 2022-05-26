import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from "@mui/material/Button";
import {Modal, Snackbar, Alert} from "@mui/material";
import { Pagination, PaginationItem } from "@mui/material";

import styled from 'styled-components';

import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import ViewCompany from './ViewCompany';

import Loading from './../../components/Loading'

import Stack from "@mui/material/Stack";

import { baseURL } from '../../variables/baseURL'

const path = "company?page="
const URL = baseURL + path;

const pageCount = 10;

export default function Company() {
    const location = useLocation();
    const navigate = useNavigate();
    const pageIndex = Number(location.pathname.split('/').pop());

    const [rows, setRows] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [currPage, setCurrPage] = useState(pageIndex);
    const [maxPage, setMaxPage] = useState(currPage);

    const [loading, setLoading] = useState(true);

    const [modalState, setModalState] = useState('view');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRow, setModalRow] = useState([]);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const getData = async (URL, page) => {
        try{
            const response = await axios.get(URL + page);
            const resData = response.data;
            setRows(resData.company_list);
            setBankList(resData.bank_list);
            setMaxPage(Math.ceil(resData.companyallcount / pageCount))
            setLoading(false);
            setCurrPage(page);
        } catch (error) {
            console.log(error);
        }
    }

    const openModal = (state, row) => {
        setModalRow(row);
        setModalState(state);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }


    const selectModal = (state, row) => {
        if (state === 'add') {
            return <AddCompany
                bankList = {bankList}
                closeModal = {closeModal}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        } else if (state === 'view') {
            return <ViewCompany
                row = {row}
                setModalState = {setModalState}
                closeModal = {closeModal}
            />;
        } else if (state === 'edit') {
            return <EditCompany
                row = {row}
                bankList= {bankList}
                closeModal = {closeModal}
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
        if (rows.length == 0 && maxPage !== currPage && currPage >= 2) {
            navigate(`/company/${currPage - 1}`);
            getData(URL, currPage - 1);
        } else {
            getData(URL, currPage);
        }
    }

    useEffect(() => {
        init();
    }, [
        successOpen,
        maxPage,
        currPage
        ]
    );

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <InnerContainer>
                <TitleContainer>
                    <div>All Companies</div>
                    <div>
                        <Button 
                            variant="contained" 
                            size="medium"
                            onClick={() => openModal('add')}
                        >
                            Add Company
                        </Button>
                    </div>
                </TitleContainer>
                <TableContainer component={Paper}>
                    <Table sx={{width:'100%'}}>
                        <TableHead>
                            <TableRow>
                                <StyledCell>No.</StyledCell>
                                <StyledCell>Name</StyledCell>
                                <StyledCell>License No.</StyledCell>
                                <StyledCell>Address</StyledCell>
                                <StyledCell>Contact No.</StyledCell>
                                <StyledCell>Email</StyledCell>
                                <StyledCell>Description</StyledCell>
                                {/*<StyledCell>Added On</StyledCell>*/}
                                <StyledCell>Action</StyledCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.com_uid}
                                >
                                    <StyledCell component="th" scope="row">{(currPage * pageCount - pageCount) + (index + 1)}</StyledCell>
                                    <StyledCell>{row.com_name}</StyledCell>
                                    <StyledCell>{row.com_licence_no}</StyledCell>
                                    <StyledCell width='200px'>{row.com_address}</StyledCell>
                                    <StyledCell>{row.com_contact_no}</StyledCell>
                                    <StyledCell width='150px'>{row.com_email}</StyledCell>
                                    <StyledCell width='200px'>{row.com_description}</StyledCell>
                                    {/*<StyledCell>{row.com_joindate}</StyledCell>*/}
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

                <StyledPagination
                    count={maxPage}
                    onChange={handlePagi}
                    siblingCount={3}
                    page={currPage}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/company/${item.page}`}
                            {...item}
                        />
                    )}
                />
                
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