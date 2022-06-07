import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { baseURL } from "../../variables/baseURL";
import { HomeContext } from "../../components/SideDrawer";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import styled from 'styled-components';

import { Alert, Grid, Snackbar } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

const path = "user/"
const URL = baseURL + path;

export default function MyPage() {
    const {homeData} = useContext(HomeContext);
    const userUid = homeData && homeData.user_uid;

    const [userSName, setUserSName] = useState('');

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    const schema = yup
        .object()
        .shape({
            user_storename: yup
                .string()
                .required('스토어 이름을 입력해주세요'),
            user_pw: yup
                .string()
                .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/, '8~64자 영문 대 소문자, 숫자, 특수문자를 사용하세요.')
                .required('비밀번호를 입력해주세요.'),
            user_confirm: yup
                .string()
                .oneOf([yup.ref('user_pw'), null], '비밀번호가 일치하지 않습니다.'),
        })
        .required();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            user_email: '',
            user_storename: '',
            user_pw : ''
        }
    });

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);
    };

    const onSubmit = (async (data) => {
        // console.log(data)

        if(data.user_pw == data.user_confirm) {
            try {
                const response = await axios.patch(`${URL}${userUid}/`, {
                    "user_email" : homeData.user_email,
                    "user_storename" : data.user_storename,
                    "user_pw" : data.user_pw,
                })

                if (response) {
                    console.log('정보변경 성공 response', response);
                    setSuccessOpen(true);
                    setUserSName(data.user_storename);

                } else {
                    console.log(response);
                    setErrorOpen(true);
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            await console.log('실패');
        }
    })

    useEffect(() => {
        {homeData &&
        setUserSName(homeData.user_storename);
        }
    }, [homeData])

    return(
        <>
            <Container>
                <InnerContainer>
                    <form onSubmit={handleSubmit(onSubmit)} sx={{margin: '0px'}}>
                        {homeData &&
                            (
                                <Grid className={'gridDiv'} container spacing={1.1}>
                                    <Grid item xs={12}>
                                        <Title>
                                            {userSName}
                                        </Title>
                                    </Grid>

                                    <Grid>
                                        {/*<GridTitle>*/}
                                        {/*    My Information*/}
                                        {/*</GridTitle>*/}

                                        <GridInput>
                                            <GridItem container spacing={1} item xs={5}>
                                                Email Account*
                                            </GridItem>
                                            <GridText item xs={12}>
                                                <Controller
                                                    name={'user_email'}
                                                    control={control}
                                                    render={({field}) =>
                                                        <TextField
                                                            required
                                                            {...field}
                                                            {...register('user_email')}
                                                            placeholder={homeData.user_email}
                                                            sx={{width: '100%'}}
                                                            autocomplete="false"
                                                            defaultValue={homeData.user_email}
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    }
                                                />
                                                <ErrorMessage>{errors.user_email?.message}</ErrorMessage>
                                            </GridText>
                                        </GridInput>
                                        <GridInput>
                                            <GridItem container spacing={1} item xs={5}>
                                                Store Name*
                                            </GridItem>
                                            <GridText item xs={12}>
                                                <Controller
                                                    name={'user_storename'}
                                                    control={control}
                                                    render={({field}) =>
                                                        <TextField
                                                            required
                                                            label="Store Name"
                                                            {...field}
                                                            {...register('user_storename')}
                                                            placeholder={homeData.user_storename}
                                                            sx={{width: '100%'}}
                                                            autocomplete="false"
                                                            defaultValue={homeData.user_storename}
                                                        />
                                                    }
                                                />
                                                <ErrorMessage>{errors.user_storename?.message}</ErrorMessage>

                                            </GridText>
                                        </GridInput>
                                    </Grid>

                                    <Grid>
                                        {/*<GridTitle>*/}
                                        {/*    My Password*/}
                                        {/*</GridTitle>*/}

                                        <GridInput>
                                            <GridItem container spacing={1} item xs={5}>
                                                Password*
                                            </GridItem>
                                            <GridText item xs={12}>
                                                <Controller
                                                    name={'user_pw'}
                                                    control={control}
                                                    render={({field}) =>
                                                        <TextField
                                                            type={'password'}
                                                            required
                                                            label="Password"
                                                            {...field}
                                                            {...register('user_pw')}
                                                            sx={{width: '100%'}}
                                                        />

                                                    }
                                                />
                                                <ErrorMessage>{errors.user_pw?.message}</ErrorMessage>

                                            </GridText>
                                        </GridInput>

                                        <GridInput>
                                            <GridItem container spacing={1} item xs={5}>
                                                Confirm Password*
                                            </GridItem>
                                            <GridText item xs={12}>
                                                <Controller
                                                    name={'user_confirm'}
                                                    control={control}
                                                    render={({field}) =>
                                                        <TextField
                                                            type={'password'}
                                                            required
                                                            label="Confirm Password"
                                                            {...field}
                                                            {...register('user_confirm')}
                                                            fullWidth={true}
                                                            sx={{width: '100%'}}
                                                        />

                                                    }
                                                />
                                                <ErrorMessage>{errors.user_confirm?.message}</ErrorMessage>

                                            </GridText>
                                        </GridInput>

                                    </Grid>

                                    <ButtonDiv>
                                        <Button className="subBtn" type="submit" variant="contained">Save</Button>
                                    </ButtonDiv>
                                </Grid>
                            )
                        }
                    </form>
                </InnerContainer>
            </Container>
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

const Container = styled.div`
    display: flex;
      .gridDiv {
        display: flex;
        flex-direction: column;
      }
`;

const InnerContainer = styled(Grid)`
  padding: 2em 3em;
  width: 65%;
`;

const Title = styled.div`
    color: black;
    font-size: 2em;
    margin: 0px 0px 2em 1em;
    text-align: center;
`;

// const GridTitle = styled(Grid)`
//   font-weight: bold;
//   font-size: 1.2em;
// `

const GridInput = styled(Grid)`
  display: flex;
  align-items: center;
`

const GridItem = styled(Grid)`
  font-weight: bold;
  padding: 2em;
  color: grey;
  margin-right: 1em;
`

const GridText = styled(Grid)`
  margin-left: 3em;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  .subBtn {
    padding: 1.2em 5em;
    font-weight: bold;
    background: grey;
  }
  .subBtn:hover {
    background: lightgray;
    color: gray;
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin: 0.5em 0px 1.3em 5px;
`
