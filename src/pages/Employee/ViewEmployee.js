import React from 'react';
import {IconButton, Button, Tooltip} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import {
    CloseButton,
    StyledButton,
    ModalContainer,
    GridContainer,
    GridDescription,
    GridInnerTitle,
    GridName,
    GridContent,
    GridInnerContainer,
    GridInnerItem
} from '../../styles/Modal';
import {numberWithCommas} from "../../utils/functions";

const flexName = 4;
const flexContent = 12 - flexName;

export default function ViewEmployee({ row, setModalState, closeModal }) {

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

                <GridContainer container>
                    <GridName item xs={flexName}>Name</GridName>
                    <GridContent item xs={flexContent}>{row.emp_name}</GridContent>
                    <GridName item xs={flexName}>Joining Date</GridName>
                    <GridContent item xs={flexContent}>{row.emp_joindate}</GridContent>
                    <GridName item xs={flexName}>Phone</GridName>
                    <GridContent item xs={flexContent}>{row.emp_phone}</GridContent>
                    <GridName item xs={flexName}>Address</GridName>
                    <GridContent item xs={flexContent}>{row.emp_address}</GridContent>

                    <GridInnerTitle item xs={12}>Employee Bank</GridInnerTitle>

                    <GridName item xs={flexName}>Account No.</GridName>
                    <GridContent item xs={flexContent}>{row.emp_account_no}</GridContent>
                    <GridName item xs={flexName}>Bank Name</GridName>
                    <GridContent item xs={flexContent}>{row.bank_name}</GridContent>

                    {row.emp_salary.length ? (
                        <>
                            <GridInnerTitle item xs={12}>Employee Salary History</GridInnerTitle>

                            <GridInnerContainer container>
                                <GridInnerItem strong="true" item xs={2}>ID</GridInnerItem>
                                <GridInnerItem strong="true" item xs={5}>Date</GridInnerItem>
                                <GridInnerItem strong="true" item xs={5}>Amount</GridInnerItem>
                                {/*<GridInnerItem strong="true" item xs={3}>Add On</GridInnerItem>*/}

                                {row.emp_salary.map((each, index) => (
                                    <React.Fragment
                                        key={each.sal_uid}
                                    >
                                        <GridInnerItem item xs={2}>{index + 1}</GridInnerItem>
                                        <GridInnerItem item xs={5}>{each.sal_joindate.split(' ')[0]}</GridInnerItem>
                                        <GridInnerItem item xs={5}>{numberWithCommas(each.sal_amount)}</GridInnerItem>
                                        {/*<GridInnerItem item xs={3}>{each.sal_date}</GridInnerItem>*/}
                                    </React.Fragment>
                                ))}
                            </GridInnerContainer>
                        </>
                    ) : (
                        <></>
                    )}
                </GridContainer>

                <StyledButton>
                    <Button variant="contained" onClick={() => setModalState('edit')}>Edit</Button>
                </StyledButton>
            </ModalContainer>
        </>
    )
}

