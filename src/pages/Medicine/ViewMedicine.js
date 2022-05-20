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

export default function ViewMedicine({ row, setModalState, closeModal }) {

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
                    <GridContent item xs={flexContent}>{row.med_name}</GridContent>
                    <GridName item xs={flexName}>Medicine Type</GridName>
                    <GridContent item xs={flexContent}>{row.med_type}</GridContent>
                    <GridName item xs={flexName}>Buy Price</GridName>
                    <GridContent item xs={flexContent}>{row.med_buyprice}</GridContent>
                    <GridName item xs={flexName}>Sell Price</GridName>
                    <GridContent item xs={flexContent}>{row.med_sellprice}</GridContent>
                    <GridName item xs={flexName}>C GST</GridName>
                    <GridContent item xs={flexContent}>{row.med_cgst}</GridContent>
                    <GridName item xs={flexName}>S GST</GridName>
                    <GridContent item xs={flexContent}>{row.med_sgst}</GridContent>
                    <GridName item xs={flexName}>Expire Date</GridName>
                    <GridContent item xs={flexContent}>{row.med_expire}</GridContent>
                    <GridName item xs={flexName}>Mfg Date</GridName>
                    <GridContent item xs={flexContent}>{row.med_mfg}</GridContent>
                    <GridName item xs={flexName}>Description</GridName>
                    <GridContent item xs={flexContent}>
                        <GridDescription>{row.med_desc}</GridDescription>
                    </GridContent>
                    <GridName item xs={flexName}>In Stock Total</GridName>
                    <GridContent item xs={flexContent}>{row.med_instock}</GridContent>
                    <GridName item xs={flexName}>Qty in Strip</GridName>
                    <GridContent item xs={flexContent}>{row.med_qty}</GridContent>
                    <GridName item xs={flexName}>Company</GridName>
                    <GridContent item xs={flexContent}>{row.med_company}</GridContent>

                    {row.med_salt.length ? (
                        <>
                            <GridInnerTitle item xs={12}>Medicine Detail</GridInnerTitle>

                            <GridInnerContainer container>
                                <GridInnerItem strong="true" item xs={3}>Salt Name</GridInnerItem>
                                <GridInnerItem strong="true" item xs={3}>Salt Qty</GridInnerItem>
                                <GridInnerItem strong="true" item xs={3}>Salt Qty Type</GridInnerItem>
                                <GridInnerItem strong="true" item xs={3}>Salt Description</GridInnerItem>

                                {row.med_salt.map((each, index) => (
                                    <React.Fragment
                                        key={each.salt_uid}
                                    >
                                        <GridInnerItem item xs={3}>{each.salt_name}</GridInnerItem>
                                        <GridInnerItem item xs={3}>{numberWithCommas(each.salt_qty)}</GridInnerItem>
                                        <GridInnerItem item xs={3}>{each.salt_qty_type}</GridInnerItem>
                                        <GridInnerItem item xs={3}>{each.salt_desc}</GridInnerItem>
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

