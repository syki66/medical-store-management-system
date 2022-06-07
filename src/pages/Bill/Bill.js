import React, {useEffect, useState, useRef, useCallback} from 'react';
import axios from 'axios';

import DetailItem from "./DetailItem";
import BillModal from "./BillModal";
import { generateDate } from "../../utils/functions"
import { baseURL } from '../../variables/baseURL'
import { DETAIL_DEFINE } from '../../variables/constants'

import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Bill() {
    const path = "customer/bill"
    const URL = baseURL + path;

    const [customerBill, setCustomerBill] = useState([]);
    const [detailList, setDetailList] = useState([{
        id: 0,
        sr_no : '',
        med_uid: '',
        med_sellprice : '',
        detail_amount : ''
    }
    ]);

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Customer info
    const nameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();
    const customerInfoRef = useRef({
        name: nameRef,
        address: addressRef,
        phone: phoneRef,
    });

    const getCustomerRequest = async () => {
        try {
            const response = await axios.get(URL)
            // console.log('medicine response', response)
            setCustomerBill(response.data)

        } catch (error) {
            console.log(error)
        }
    };

    // Add medicine detail
    const clickAdd = useCallback(() => {
        const _detailList = [...detailList];
        let newDetailItem = {
            id: detailList.length,
            sr_no : '',
            med_uid : '',
            med_sellprice : '',
            detail_amount : ''
        };

        _detailList.push(newDetailItem);

        setDetailList(_detailList);
    }, [detailList]);

    // Delete medicine detail
    const handleDelete = useCallback((idx) => {
        let _detailList = [...detailList];
        _detailList.splice(idx, 1);

        setDetailList(_detailList);
    },[detailList]);

    // Handle customer info
    const handleCustomerInfo = (e) => {
        const { name, value } = e.target;

        customerInfoRef.current[name] = value;
        // console.log('customerInfoRef', customerInfoRef)
    }

    // Handle medicine detail
    const handleChange = useCallback((idx, key, value) => {
        let _detailList = [...detailList];
        _detailList[idx][key] = value;

        setDetailList(_detailList);

    },[detailList]);


    // Generate bill (post bill request)
    const handleSubmit = async(e) => {
        e.preventDefault();
        handleOpen();

        // console.log('submit url', baseURL + 'customer/bill')
        try {
            const response = await axios.post(baseURL + 'customer/bill',
                {
                        "joindate": generateDate(),
                        "med_list" : detailList.map((detailItem, idx) => {
                            return (
                                {
                                    "med_uid": detailItem.med_uid,
                                    "detail_amount": parseInt(detailItem.detail_amount)
                                }
                            )
                        }),
                    }
             )
            console.log('성공response', response)
        } catch (error) {
            console.log(error)
        }
    }

    // Detail item 컴포넌트 뿌려주는 함수
    const getDetailListComp = useCallback(() => {
        return detailList.map((detailItem, idx) => {
            return (
                <DetailItem
                    key={idx}
                    idx={idx}
                    detailItem={detailItem}
                    onChange={handleChange}
                    onDelete={handleDelete}
                    customerBill={customerBill}
                    detailList={detailList}
                    setDetailList={setDetailList}
                />
            );
        })
    }, [detailList, handleChange, handleDelete, customerBill]);

    useEffect(() => {
        getCustomerRequest();
    }, []);


    return (
        <>
            <PageContainer>
                <form onSubmit={handleSubmit} autoComplete="off" >
                    <BillContainer>
                        <div className='first'>
                            <div>
                                <h3>Generate Bill for Customers</h3>
                            </div>
                            <div className='infoCon'>
                                <div className='firstRow'>
                                    <TextField
                                        required
                                        type={'text'}
                                        inputRef={nameRef}
                                        name={'name'}
                                        onChange={handleCustomerInfo}
                                        type={'text'}
                                        label="Customer Name"
                                        className='textField'
                                        margin="normal"
                                        style={{marginRight: 1 + 'em'}}
                                    />
                                    <TextField
                                        required
                                        inputRef={phoneRef}
                                        onChange={handleCustomerInfo}
                                        label="Phone"
                                        name={'phone'}
                                        className='textField'
                                        margin="normal"
                                        style={{marginRight: 1 + 'em'}}
                                    />
                                </div>
                                <div className='secondRow'>
                                    <TextField
                                        required
                                        inputRef={addressRef}
                                        onChange={handleCustomerInfo}
                                        label="Address"
                                        name={'address'}
                                        className='textField'
                                        margin="normal"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='second'>
                            <div className='title'>
                                <h3>Medicine Details</h3>
                                <AddCircleIcon onClick={(e) => clickAdd(e)} className='plusBtn' />
                            </div>

                            {getDetailListComp()}
                        </div>
                        <div className='submitBtnCon'>
                            <Button
                                type='submit'
                                className='submitBtn'
                                fullWidth='true'
                                variant="contained"
                            >
                                Generate Bill
                            </Button>
                            <BillModal
                                open={open}
                                handleClose={handleClose}
                                customerBill={customerBill}
                                detailList={detailList}
                                customerInfoRef={customerInfoRef.current}
                            />
                        </div>
                    </BillContainer>
                </form>
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
  padding: 1em;
`

const BillContainer = styled.div`
  display: flex;
  flex-direction: column;
  .second {
    margin-top: 2em;
  }
  .infoCon {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .firstRow {
    width: 100%;
    display: flex;
    flex-direction: row;
    .textField {
      width: 50%;
    }
  }
  .secondRow {
    width: 100%;
    display: flex;
    flex-direction: row;
    .textField {
      width: 99%;
    }
  }

  .detailCon {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .textField {
      width: 33%;
    }

    .removeBtn {
      color: #f2413b;
    }
  }

  .title {
    display: flex;
    margin: 0px;
    padding: 0px;

    .plusBtn {
      color: seagreen;
    }
  }

  .submitBtnCon {
    margin-top: 2em;
  }
`