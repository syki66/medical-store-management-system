import React, { useContext } from 'react';

import { HomeContext } from "../../components/SideDrawer";
import ProfitChart from "./ProfitChart";
import SellChart from "./SellChart";

import styled from "styled-components";
import { Paper } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Home() {

    const { homeData } = useContext(HomeContext);

    return (
        <>
            {homeData && <PageContainer>
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
                                    <p>{homeData.user_totalreqs}</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark fB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail fD'}>
                                    <h5>TOTAL MEDICINE</h5>
                                    <p>{homeData.total_medicine}</p>
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
                                    <p>{homeData.user_completedreq}</p>
                                </div>
                            </Paper>
                            <Paper className={'indiBoard'} elevation={3}>

                                <div className={'bookmark sB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail sD'}>
                                    <h5>PENDING REQUEST</h5>
                                    <p>{homeData.user_pendingreq}</p>
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
                                    <p>{homeData.total_employee}</p>
                                </div>
                            </Paper>

                            <Paper className={'indiBoard'} elevation={3}>
                                <div className={'bookmark tB'}>
                                    <BookmarkIcon></BookmarkIcon>
                                </div>
                                <div className={'detail tD'}>
                                    <h5>TOTAL COMPANY</h5>
                                    <p>{homeData.total_company}</p>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
                <div className={'second'}>
                        <>
                            <ProfitChart />
                            <SellChart />
                        </>
                </div>
            </PageContainer>}
        </>
    )
}

const PageContainer = styled.div`
      padding: 1em;
      margin-left: 1em;
      width: 100%;
      .second {
        display: flex;
        justify-content: center;
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
