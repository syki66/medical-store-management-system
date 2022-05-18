import React, {useEffect, useState} from 'react';
import axios from "axios";

import ProfitChart from "./ProfitChart";
import SellChart from "./SellChart";

import styled from "styled-components";
import { Paper } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Home() {
    const [getHomeData, setGetHomeData] = useState({
        "user_uid": 1,
        "user_storename": "씨엔알약국",
        "user_email": "baek1008@asd.com",
        "user_totalreqs": 100,
        "total_medicine" : 300,
        "user_completedreq": 50,
        "user_pendingreq": 5,
        "user_employee": 900,
        "user_company": 104,
        "bill_profit": [
            {
                date: "2022-03-05",
                won: 100000
            },
            {
                date: "2022-03-06",
                won: 160000
            },
            {
                date: "2022-03-07",
                won: 800000
            },
            {
                date: "2022-03-08",
                won: 200000
            },
            {
                date: "2022-03-09",
                won: 330000
            },
            {
                date: "2022-03-10",
                won: 360000
            }
            ,
            {
                date: "2022-03-11",
                won: 30000
            }
        ],
        "bill_total_sell": [
            {
                date: "2022-03-05",
                won: 100000
            },
            {
                date: "2022-03-06",
                won: 160000
            },
            {
                date: "2022-03-07",
                won: 800000
            },
            {
                date: "2022-03-08",
                won: 200000
            },
            {
                date: "2022-03-09",
                won: 330000
            },
            {
                date: "2022-03-10",
                won: 360000
            }
            ,
            {
                date: "2022-03-11",
                won: 30000
            }
        ]
    })

    const URL = 'http://localhost:8000/'
    // const URL = 'http://3.34.144.222:8000/'
    // const URL = 'http://3.36.26.172:8000/'

    const getData = async () => {
        try {
            // const response = await axios.get(URL + 'user',
            const response = await axios.get(URL + 'medicine?page=1',
                {
                    withCredentials: true
                })
            console.log('user', response.data)
            // setGetHomeData(response)
            // setGetHomeData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // getData()
        // console.log('getHomeData', getHomeData)
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
                                    <p>{getHomeData.user_totalreqs}</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark fB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail fD'}>
                                    <h5>TOTAL MEDICINE</h5>
                                    <p>{getHomeData.total_medicine}</p>
                                </div>
                            </Paper>
                        </div>

                        <div className={'bookmarkColumn sColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>COMPLETED REQUEST</h5>
                                    <p>{getHomeData.user_completedreq}</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>

                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>PENDING REQUEST</h5>
                                    <p>{getHomeData.pendingreq}</p>
                                </div>
                            </Paper>
                        </div>

                        <div className={'bookmarkColumn tColumn'}>
                            <Paper className={'indiBoard'} elevation={3}>

                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TOTAL EMPLOYEE</h5>
                                    <p>{getHomeData.user_employee}</p>
                                </div>
                            </Paper>

                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TOTAL COMPANY</h5>
                                    <p>{getHomeData.user_company}</p>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
                <div className={'second'}>
                    {getHomeData && (
                        <>
                        <ProfitChart getHomeData={getHomeData}/>
                        <SellChart getHomeData={getHomeData}/>
                        </>)
                    }
                </div>
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
      padding: 1em;
      margin-left: 1em;
      width: 100%;
      .second {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 3em;
      }
      .bookmarksCon {
        display: flex;
        flex-direction: column;
      }
      .bookmarkColumn {
        display: flex;
      }
      .indiBoard {
        width: 100%;
        display: flex;
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
