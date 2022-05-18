import React, { useState, useRef } from 'react';
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

const checkEmailExist = () => {
    if (localStorage.getItem("email") === null) {
        return false
    } else {
        return true
    }
}

export default function Login( { setLogin } ) {
    const [inputs, setInputs] = useState({
        user_email: localStorage.getItem('email'),
        user_pw: ''
    })
    const [saveID, setSaveID] = useState(checkEmailExist())

    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const errorMessage = useRef('error');

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
            console.log(inputs)
            const response = await axios.post(URL, inputs)
            if (response.status) {
                setLogin(true);
                setLoginSession(true);
                saveID ?
                    localStorage.setItem('email', inputs.user_email) :
                    localStorage.clear();
            }

        } catch (error) {
            const { status, data } = error.response;
            if (status === 401){
                const timeArray = data.useTime.split(/[-\s:]/).map(x => {
                    return parseInt(x, 10);
                });
                errorMessage.current = `비밀번호를 5회 이상 틀렸습니다. ${timeArray[3]}시 ${timeArray[4]}분 ${timeArray[5]}초 이후에 다시 시도해 주십시오.`;
            } else if (status === 404) {
                errorMessage.current = '이메일 또는 비밀번호가 틀렸습니다.'
            } else {
                data.message ?
                errorMessage.current = data.message:
                errorMessage.current = '오류가 발생했습니다.'
            }
            setErrorOpen(true);
        }
    }

    const handleCheck = (event) => {
        event.target.checked ? setSaveID(true) : setSaveID(false);
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
                                    value={inputs.user_email}
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
                                    <FormControlLabel control={<Checkbox onChange={handleCheck} checked={saveID}/>} label="아이디 저장" />
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
                        {errorMessage.current}
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