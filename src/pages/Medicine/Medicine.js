import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import { Modal, Snackbar, Alert } from "@mui/material";

import styled from 'styled-components';

import AddMedicine from './AddMedicine';
import EditMedicine from './EditMedicine';
import ViewMedicine from './ViewMedicine';

import Stack from "@mui/material/Stack";

import { baseURL } from '../../variables/baseURL'

const path = "medicine?page="
const URL = baseURL + path;

const pageCount = 10;

export default function Medicine() {
    const [rows, setRows] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);

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
            console.log(resData);
            setRows(resData.medicine_list);
            setCompanyList(resData.company_list);
            setMaxPage(Math.ceil(resData.medicineallcount / pageCount))
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
            return <AddMedicine
                companyList = {companyList}
                closeModal = {closeModal}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        } else if (state === 'view') {
            return <ViewMedicine
                row = {row}
                setModalState = {setModalState}
                closeModal = {closeModal}
            />;
        } else if (state === 'edit') {
            return <EditMedicine
                row = {row}
                companyList= {companyList}
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

    if (loading) {
        return null; // 로딩중 아이콘 넣기
    }

    return (
        <>
            <InnerContainer>
                <TitleContainer>
                    <div>Manage Medicine</div>
                    <div>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => openModal('add')}
                        >
                            Add Medicine
                        </Button>
                    </div>
                </TitleContainer>
                <TableContainer component={Paper}>
                    <Table sx={{width:'100%'}}>
                        <TableHead>
                            <TableRow>
                                <StyledCell>No.</StyledCell>
                                <StyledCell>Name</StyledCell>
                                <StyledCell>Medical Type</StyledCell>
                                <StyledCell>Buy Price</StyledCell>
                                <StyledCell>Sell Price</StyledCell>
                                <StyledCell>Expire Date</StyledCell>
                                <StyledCell>Mfg Date</StyledCell>
                                <StyledCell>In Stock</StyledCell>
                                <StyledCell>Company</StyledCell>
                                <StyledCell>Action</StyledCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.med_uid}
                                >
                                    <StyledCell component="th" scope="row">{(currPage * pageCount - pageCount) + (index + 1)}</StyledCell>
                                    <StyledCell>{row.med_name}</StyledCell>
                                    <StyledCell>{row.med_type}</StyledCell>
                                    <StyledCell>{row.med_buyprice}</StyledCell>
                                    <StyledCell>{row.med_sellprice}</StyledCell>
                                    <StyledCell>{row.med_expire}</StyledCell>
                                    <StyledCell>{row.med_mfg}</StyledCell>
                                    <StyledCell>{row.med_instock}</StyledCell>
                                    <StyledCell>{row.med_company}</StyledCell>
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