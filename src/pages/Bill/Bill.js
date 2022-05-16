import React, {useEffect, useState, useRef, useCallback} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DetailItem from "./DetailItem";
import BillModal from "./BillModal";

import { generateDate } from "../../utils/functions"


const URL = "http://localhost:8000/";

export default function Bill() {
    const [medList, setMedList] = useState([
        {
            "med_uid": 1,
            "med_name": "게보린",
            "med_type": "tablet",
            "med_buyprice": 2500,
            "med_sellprice": 4500,
            "med_cgst": 15,
            "med_sgst": 20,
            "med_expire": "2022-01-12",
            "med_mfg": "2020-04-22",
            "med_desc": "두통,치통,생리통",
            "med_instock": 250,
            "med_qty": 5,
            "med_company": "OO제약",
            "med_salt": [
                {
                    "salt_uid": 1,
                    "salt_name": "약1",
                    "salt_qty": 10,
                    "salt_qty_tyep": "tablet",
                    "salt_desc": "항생제"
                }
            ]
        },
        {
            "med_uid": 2,
            "med_name": "박카스",
            "med_type": "tablet",
            "med_buyprice": 2500,
            "med_sellprice": 4500,
            "med_cgst": 15,
            "med_sgst": 20,
            "med_expire": "2022-01-12",
            "med_mfg": "2020-04-22",
            "med_desc": "두통,치통,생리통",
            "med_instock": 250,
            "med_qty": 5,
            "med_company": "OO제약",
            "med_salt": [
                {
                    "salt_uid": 1,
                    "salt_name": "약1",
                    "salt_qty": 10,
                    "salt_qty_tyep": "tablet",
                    "salt_desc": "항생제"
                }
            ]
        },
        {
            "med_uid": 3,
            "med_name": "타이레놀",
            "med_type": "tablet",
            "med_buyprice": 2500,
            "med_sellprice": 4500,
            "med_cgst": 15,
            "med_sgst": 20,
            "med_expire": "2022-01-12",
            "med_mfg": "2020-04-22",
            "med_desc": "두통,치통,생리통",
            "med_instock": 250,
            "med_qty": 5,
            "med_company": "OO제약",
            "med_salt": [
                {
                    "salt_uid": 1,
                    "salt_name": "약1",
                    "salt_qty": 10,
                    "salt_qty_tyep": "tablet",
                    "salt_desc": "항생제"
                }
            ]
        }]);

    const [detailList, setDetailList] = useState([{
        id: 0,
        sr_no : '',
        med_uid: '',
        qty : '',
        qty_type : '',
        price : '',
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
    const formRef = useRef({
        name: nameRef,
        address: addressRef,
        phone: phoneRef,
    });


    // Add medicine detail
    const clickAdd = useCallback(() => {
        const _detailList = [...detailList];
        let newDetailItem = {
            id: detailList.length,
            sr_no : '',
            med_uid : '',
            qty : '',
            qty_type : '',
            price : '',
            detail_amount : ''
        };

        _detailList.push(newDetailItem);

        setDetailList(_detailList);
    }, [detailList]);

    // Delete medicine detail
    const handleDelete = useCallback((idx) => {
        // console.log('복사 전 ', detailList);
        let _detailList = [...detailList];
        // console.log('복사해온 detilaList', _detailList)

        _detailList.splice(idx, 1);

        setDetailList(_detailList);
    },[detailList]);

    // Handle customer info
    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        formRef.current[name] = value;
        // console.log('formRef', formRef)
    }

    // Handle medicine detail
    const handleChange = useCallback((idx, key, value) => {
        // console.log('복사 전 ', detailList);
        let _detailList = [...detailList];
        // console.log('복사해온 detilaList', _detailList)
        _detailList[idx][key] = value;

        setDetailList(_detailList);
    },[detailList]);


    // Generate bill (post bill request)
    const onSubmit = (e) => {
        e.preventDefault();
        handleOpen();

        console.log('postbill',
            {
                "joindate": generateDate(),
                "med_list" : detailList.map((detailItem) => {
                    return (
                        {
                            "med_uid": detailItem.med_uid,
                            "detail_amount": detailItem.detail_amount
                        }
                    )
                }),
            }
        )

        // try {
        //     // const response = await axios.post(URL + 'user',
        //     const response = await axios.post(URL + 'customer/bill',
        //         {
        //                 "joindate": generateDate(),
        //                 "med_list" : detailList.map((detailItem) => {
        //                     return (
        //                         {
        //                             "med_uid": detailItem.med_uid,
        //                             "detail_amount": detailItem.detail_amount
        //                         }
        //                     )
        //                 }),
        //             }
        //      )
        //     console.log('response', response.data)
        // } catch (error) {
        //     console.log(error)
        // }
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
                    medList={medList}
                />
            );
        })
    }, [detailList, handleChange, handleDelete]);

    // const getMedList = async () => {
    //     try {
    //         // const response = await axios.get(URL + 'user',
    //         const response = await axios.get(URL + 'medicine?page=1')
    //         setMedList(response.data.medicine_list)
    //         console.log('response', response.data.medicine_list)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    useEffect(() => {
        // getMedList();
    }, [medList]);

    // ----------------------------------------------------------

    return (
        <>
            <PageContainer>
                <form noValidate autoComplete="off" >
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
                                        onChange={handleChangeForm}
                                        type={'text'}
                                        label="Customer Name"
                                        className='textField'
                                        margin="normal"
                                        style={{marginRight: 1 + 'em'}}
                                    />
                                    <TextField
                                        required
                                        inputRef={phoneRef}
                                        onChange={handleChangeForm}
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
                                        onChange={handleChangeForm}
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
                                onClick={onSubmit}
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
                                medList={medList}
                                detailList={detailList}
                                formRef={formRef.current}
                            />
                        </div>
                    </BillContainer>
                </form>
            </PageContainer>
        </>
    )
}


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];



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
    //align-items: center;

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