import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Paper, TextField} from "@mui/material";
import React, {useState, useRef, useEffect, useCallback} from "react";
import axios from "axios";
import styled from "styled-components";
import {baseURL} from "../../variables/baseURL";
import {checkValidation} from "../../utils/functions";

const path = 'user/signup/';
const URL = baseURL + path;

export default function Register( {closeModal, setSuccessOpen, setErrorOpen} ) {
    const [inputs, setInputs] = useState({
        "user_email": "",
        "user_storename": "",
        "user_pw": "",
        "user_pw_confirm": ""
    })
    const [validError, setValidError] = useState({
        "user_email": {
            state: false,
            helperText: "",
        },
        "user_storename": {
            state: false,
            helperText: "",
        },
        "user_pw": {
            state: false,
            helperText: "",
        },
        "user_pw_confirm": {
            state: false,
            helperText: "",
        }
    });

const checkEmail = (event) => {
    const { id, value } = event.target;
    if (!checkValidation(id, value)) {
        setValidError({
            ...validError,
            "user_email": {
                state: true,
                helperText: "올바른 이메일 형식으로 입력해주세요.",
            },
        })
    } else {
        setValidError({
            ...validError,
            "user_email": {
                state: false,
                helperText: "",
            },
        })
    }

}

const checkPassword = (event) => {
    const { id, value } = event.target;
    if (id === 'user_pw'){
        if (!checkValidation(id, value)) {
            setValidError({
                ...validError,
                "user_pw": {
                    state: true,
                    helperText: "8~64자 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
                }
            })
        } else {
            setValidError({
                ...validError,
                "user_pw": {
                    state: false,
                    helperText: "",
                }
            })
        }
    }
    if (id === 'user_pw_confirm'){
        if (inputs.user_pw !== value){
            setValidError({
                ...validError,
                "user_pw_confirm": {
                    state: true,
                    helperText: "패스워드가 일치하지 않습니다.",
                }
            })
        } else {
            setValidError({
                ...validError,
                "user_pw_confirm": {
                    state: false,
                    helperText: "패스워드가 일치합니다.",
                }
            })
        }
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

    // validError에서 state가 모두 false일 경우에만 제출
    let pass = true;
    Object.keys(validError).map((key) => {
        if (validError[key].state === true) {
            pass = false;
        }
    })

    if (pass) {
        try{
            console.log(inputs)
            const res = await axios.post(URL, inputs);
            if (res.status === 200) {
                setSuccessOpen(true);
                closeModal();
            } else {
                console.log(res.request.status);
                setErrorOpen(true);
            }
        } catch (error) {
            if (error.response.status === 400) {
                setValidError({
                    ...validError,
                    "user_email": {
                        state: true,
                        helperText: "이미 사용중이거나 탈퇴한 아이디입니다.",
                    }
                })
            }
            console.log(error);
            setErrorOpen(true);
        }
    } else {
        setErrorOpen(true);
    }
}

return (
    <>
        <Container>
            <InnerContainer>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Title>
                                Sign Up
                            </Title>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="user_email"
                                fullWidth
                                label="E-Mail"
                                variant="outlined"
                                required
                                onChange={(event) => {
                                    checkEmail(event);
                                    handleChange(event);
                                }}
                                error={validError.user_email.state}
                                helperText={validError.user_email.helperText}
                                // onBlur={checkEmailDuplicates}
                                inputProps={{ maxLength: 64 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="user_storename"
                                fullWidth
                                label="Store Name"
                                variant="outlined"
                                required
                                onChange={handleChange}
                                inputProps={{ maxLength: 64 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="user_pw"
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                required
                                onChange={(event) => {
                                    checkPassword(event);
                                    handleChange(event);
                                }}
                                error={validError.user_pw.state}
                                helperText={validError.user_pw.helperText}
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
                                onChange={(event) => {
                                    checkPassword(event);
                                    handleChange(event);
                                }}
                                error={validError.user_pw_confirm.state}
                                helperText={validError.user_pw_confirm.helperText}
                                inputProps={{ maxLength: 64 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </Grid>
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