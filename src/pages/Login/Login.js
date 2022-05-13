import React, { useState } from 'react';
import {
    Paper,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Stack,
    Snackbar,
    Alert,
    Modal
} from "@mui/material";
import styled from 'styled-components';
import axios from 'axios';
import { baseURL } from '../../variables/baseURL'
import ResetPassword from './ResetPassword';
import Register from '../../pages/Login/Register';

const path = 'user/signin/';
const URL = baseURL + path;

export default function Login( { setLogin } ) {
    const [inputs, setInputs] = useState({
        user_email: '',
        user_pw: ''
    })

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('error');

    const [modalState, setModalState] = useState('register');
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (state) => {
        setModalState(state);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const selectModal = (state) => {
        if (state === 'register') {
            return <Register
                closeModal = {closeModal}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        } else if (state === 'findPassword') {
            return <ResetPassword
                closeModal = {closeModal}
                setSuccessOpen = {setSuccessOpen}
                setErrorOpen = {setErrorOpen}
            />;
        }
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputs({
            ...inputs,
            [id]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post(URL, inputs)
            const resData = response.data;
            console.log(resData);
            setLogin(true);
            setLoginSession(true);

        } catch (error) {
            console.log(error);
            setErrorOpen(true);
        }
    }

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const setLoginSession = (value) => {
        sessionStorage.setItem('login', value);
    }

    return (
        <>
            <Container>
                <InnerContainer>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1.1}>
                            <Grid item xs={12}>
                                <Title>
                                    Medical Store <br/>
                                    Management System
                                </Title>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user_email"
                                    fullWidth
                                    label="E-Mail"
                                    variant="outlined"
                                    required
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 64 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user_pw"
                                    type="password"
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    required
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 64 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="로그인 상태 유지" />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                >
                                    로그인
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <LinkGroup>
                                    <RegisterLink onClick={() => openModal('register')}>회원가입</RegisterLink>
                                    <FindPasswordLink onClick={() => openModal('findPassword')}>비밀번호 찾기</FindPasswordLink>
                                </LinkGroup>
                            </Grid>
                        </Grid>
                    </form>
                </InnerContainer>
            </Container>

            <StyledModal
                open={modalOpen}
                onClose={closeModal}
            >
                <>
                    {selectModal(modalState)}
                </>
            </StyledModal>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorOpen} autoHideDuration={3000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={successOpen} autoHideDuration={3000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                        성공적으로 처리 되었습니다.
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    background-color: #ececee;
`;

const InnerContainer = styled(Paper)`
    && {
        background-color: white;
        width: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 50px;
    }
`;

const Title = styled.div`
    color: black;
    font-size: xx-large;
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
`;

const LinkGroup = styled.div`
    text-align: center;
    color: #99999a;
`;

const RegisterLink = styled.span`
    border-right: solid 1px;
    padding: 0px 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
`;

const FindPasswordLink = styled.span`
    padding: 0px 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
`;

const StyledModal = styled(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;