import React, {useState, useEffect} from "react";
import axios from "axios";

import ViewRequest from "./ViewRequest";
import AddRequest from "./AddRequest";

import styled from "styled-components";

import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import {Modal} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

export default function Request() {
    const [rows, setRows] = useState([
            {
                "req_uid": 1,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 2,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 3,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 4,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 5,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 6,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 7,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 8,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 9,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 10,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 11,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            },
            {
                "req_uid": 12,
                "req_name": "둘리",
                "req_phone": "01023452345",
                "req_med_detail": "많이아파요. 두통 치통 생리통엔 개보린. 아 시원하다~ 국밥 한그릇 주세요 이모~ 깍두기도 많이 주세요. 국밥은 역시 국물 먼저 떠먹다가 밥 말아먹는거지",
                "req_joindate": "2022-03-22",
                "req_status": false
            },
            {
                "req_uid": 13,
                "req_name": "고길동",
                "req_phone": "01023452345",
                "req_med_detail": "관절이아파요",
                "req_joindate": "2022-04-12",
                "req_status": false
            }
        ]
    );
    const [currPage, setCurrPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);

    const [modalState, setModalState] = useState('view');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRow, setModalRow] = useState([]);

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const baseURL = 'http://localhost:8000/'
    const path = "customer/req?page="
    const URL = baseURL + path;

    const pageCount = 10;

    const getData = async (URL, page) => {
        try{
            const response = await axios.get(URL + page);
            // const response = await axios.get('http://localhost:8000/customer/req?page=1');
            const resData = response.data;
            console.log('response', response)
            console.log('resData', resData)
            setRows(resData.request_list);

            setMaxPage(Math.ceil(resData.requestallcount / pageCount))
            // setLoading(false);
            setCurrPage(page);
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

    const handlePagi = (event, page) => {
        getData(URL, page);
    }

    useEffect(() => {
        // getData()
        console.log('rows', rows)
        // console.log('rows.request_list', rows.request_list)

    },[])

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
                        <StyledCell>Added On</StyledCell>
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
                            <StyledCell width='200px'>{row.req_med_detail}</StyledCell>
                            <StyledCell width='150px'>{row.req_joindate}</StyledCell>
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
