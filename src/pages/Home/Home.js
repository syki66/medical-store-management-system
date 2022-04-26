import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Container, Paper } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Chart from "../../components/Chart";
import axios from "axios";

const PageContainer = styled.div`
      padding: 1em;
      margin-left: 1em;
      .second {
        display: flex;
        flex-grow: 1;
        width: 100%;
      }
      .bookmarksCon {
        display: flex;
        flex-direction: row;
      }
      .indiBoard {
        display: flex;
        //padding: 1em;
        margin-bottom: 1.2em;
        margin-right: 1.2em;
        color: #FFFFFF;
        .bookmark {
          padding: 1rem;
          display: flex;
          align-items: center;
        }
        .detail {
          padding: 1rem;
          padding-right: 2rem;
          width: 100%;
          p {
            font-size: 1.5rem;
          }
          h5 {
            font-size: 1rem;
          }
        }
        .fB {
          background: #CC1A57;
        }
        .fD {
          background: #E71E63;
        }
        .sB {
          background: #11A6B9;
        }
        .sD {
          background: #15BDD2;
        }
        .tB {
          background: #7BAA4B;
        }
        .tD {
          background: #8CC255;
        }
        .lB {
          background: darkorange;
        }
        .lD {
          background: orange;
        }
      }
    `

export default function Home() {
    const [employee, setEmployee] = useState(0)
    const [medicine, setMedicine] = useState(0)
    const [company, setCompany] = useState(0)

    const URL = 'http://localhost:8000/'

    const getData = async () => {
        try {
            const response = await axios.get(URL + 'employee?page=1',
                {
                    withCredentials: true
                })
            console.log('total employee response', response)
            setEmployee(response.data.employeeallcount)
        } catch (error) {
            console.log(error)
        }

        try {
            const response = await axios.get(URL + 'medicine?page=1',
                {
                    withCredentials: true
                })
            console.log('total medicine response', response)
            setMedicine(response.data.medicineallcount)
        } catch (error) {
            console.log(error)
        }

        try {
            const response = await axios.get(URL + 'company?page=1',
                {
                    withCredentials: true
                })
            console.log('total company response', response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <PageContainer>
                <div className={'first'}>
                    <div className='titleCon'>
                        <h3>Dashboard</h3>
                    </div>
                    <div className={'bookmarksCon'}>
                        <div className={'bookmarkColumn fColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark fB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail fD'}>
                                    <h5>TOTAL REQUEST</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark fB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail fD'}>
                                    <h5>TOTAL EMPLOYEE</h5>
                                    <p>{employee}</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark fB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail fD'}>
                                    <h5>COMPLETED REQUEST</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                        </div>

                        <div className={'bookmarkColumn sColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>TOTAL SALES</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>

                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>TOTAL PROFIT</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>PENDING REQUEST</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                        </div>

                        <div className={'bookmarkColumn tColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>

                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TOTAL MEDICINES</h5>
                                    <p>{medicine}</p>
                                </div>
                            </Paper>

                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TOTAL SALES AMOUNT</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TODAY SALES AMOUNT</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                        </div>
                        <div className={'bookmarkColumn lColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark lB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail lD'}>
                                    <h5>TOTAL COMPANY</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark lB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail lD'}>
                                    <h5>MEDICINE EXPIRE IN WEEK</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark lB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail lD'}>
                                    <h5>TODAY SALES PROFIT</h5>
                                    <p>6</p>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
                <div className={'second'}>
                    {/*<Chart />*/}
                    {/*<Chart />*/}
                </div>
            </PageContainer>

        </>
    )
}