import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Paper, TextField} from "@mui/material";
import React, {useState, useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import {baseURL} from "../../variables/baseURL";
import {checkValidation} from "../../utils/functions";

const path = 'user/';
const URL = baseURL + path;

export default function ResetPassword( {closeModal, setSuccessOpen, setErrorOpen} ) {
    const [inputs, setInputs] = useState({
        "user_email": "",
        "user_storename": ""
    })
    const [newPassword, setNewPassword] = useState({
        "user_new_pw": "",
        "user_pw_confirm": ""
    });
    const [confirmed, setConfirmed] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

    const validError = useRef({
        "user_new_pw": {
            state: false,
            helperText: "",
        },
        "user_pw_confirm": {
            state: false,
            helperText: "",
        }
    })

    const checkPassword = (event) => {
        const { id, value } = event.target;
        const { user_new_pw, user_pw_confirm } = validError.current;

        if (id === 'user_new_pw'){
            if (!checkValidation(id, value)) {
                user_new_pw.state = true;
                user_new_pw.helperText = "8~64자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
            } else {
                user_new_pw.state = false;
                user_new_pw.helperText = "";
            }

        }
        if (id === 'user_pw_confirm'){
            if (newPassword.user_new_pw !== value){
                user_pw_confirm.state = true;
                user_pw_confirm.helperText = "패스워드가 일치하지 않습니다.";
            } else {
                user_pw_confirm.state = false;
                user_pw_confirm.helperText = "패스워드가 일치합니다.";
            }
        }

        setNewPassword({
            ...newPassword,
            [id]: value
        });
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setInputs({
            ...inputs,
            [id]: value
        });
    }

    const handleSubmit = async (event, confirmed) => {
        event.preventDefault();
        if (confirmed){
            // validError에서 state가 모두 false일 경우에만 제출
            let pass = true;
            Object.keys(validError.current).map((key) => {
                if (validError.current[key].state === true) {
                    pass = false;
                }
            })
            if (pass) {
                try{
                    if (validError.current.user_pw_confirm.state || !newPassword.user_pw_confirm) {
                        setErrorOpen(true);
                        throw '비밀번호가 일치하지 않습니다.';
                    }
                    const res = await axios.post(URL + 'set/', newPassword);
                    console.log(res)
                    if (res.status === 200) {
                        closeModal();
                        setSuccessOpen(true);
                    } else {
                        console.log(res.request.status);
                        setErrorOpen(true);
                    }
                } catch (error) {
                    console.log(error);
                    setErrorOpen(true);
                }
            } else {
                setErrorOpen(true);
            }
        } else {
            try{
                const res = await axios.post(URL + 'find/', inputs);
                if (res.status === 200) {
                    setConfirmed(true);
                    setInputDisabled(true);
                } else {
                    console.log(res.request.status);
                    setErrorOpen(true);
                }
            } catch (error) {
                console.log(error);
                setErrorOpen(true);
            }
        }
    }
    return (
        <>
            <Container>
                <InnerContainer>
                    <form onSubmit={(event) => handleSubmit(event, confirmed)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Title>
                                    Reset Password
                                </Title>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user_email"
                                    fullWidth
                                    label="E-Mail"
                                    variant="outlined"
                                    disabled={inputDisabled}
                                    required
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 64 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="user_storename"
                                    fullWidth
                                    label="Store Name"
                                    variant="outlined"
                                    disabled={inputDisabled}
                                    required
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 64 }}
                                />
                            </Grid>
                            {confirmed ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="user_new_pw"
                                            fullWidth
                                            type="password"
                                            label="New Password"
                                            variant="outlined"
                                            required
                                            onChange={checkPassword}
                                            error={validError.current.user_new_pw.state}
                                            helperText={validError.current.user_new_pw.helperText}
                                            inputProps={{ maxLength: 64 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="user_pw_confirm"
                                            fullWidth
                                            type="password"
                                            label="Confirm Password"
                                            variant="outlined"
                                            required
                                            onChange={checkPassword}
                                            error={validError.current.user_pw_confirm.state}
                                            helperText={validError.current.user_pw_confirm.helperText}
                                            inputProps={{ maxLength: 64 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                        >
                                            Reset Password
                                        </Button>
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                    >
                                        Verify Account
                                    </Button>
                                </Grid>
                            )}

                        </Grid>
                    </form>

                </InnerContainer>
            </Container>
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