import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Validations from '../../helper/validation';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import { setLoggedInStatus } from '../../redux/thunk/googleAuthThunk';
import { setLoggedInStatusUser } from '../../redux/thunk/userThunk';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function LoginForm() {
    const [formState, setFormState] = useState({
        values: {}
    });
    const [message, setMessage] = useState("");
    const [openState, setOpenState] = useState(false);
    const [errors, setErrors] = useState({});
    const loggedInStatus = useSelector((state) => state.googleAuthReducer.isLoggedIn)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            }

        }));

        setErrors({
            ...errors,
            [event.target.name]: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = Validations.validateLoginForm(formState.values);
        setErrors(error);

        if (!Object.keys(error).length) {
            dispatch(setLoggedInStatusUser(formState.values))
            setFormState({ values: {} });
            setMessage("Login Successfully!");
        }
    }

    const handleClose = (event, reason) => {
        setOpenState(false);
    };

    useEffect(() => {
        //Login with Google Functionality
        const initClient = () => {
            gapi.auth2.init({
                clientId: CLIENT_ID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });


    const onSuccess = (res) => {
        const tokenId = res.tokenId;
        const profileData = res.profileObj;
        dispatch(setLoggedInStatus({ status: true, tokenId, profileData }))
    };
    const onFailure = (err) => {
        console.log(err)
        dispatch(setLoggedInStatus(false));
    };

    console.log("loggedInStatus", loggedInStatus)

    if (loggedInStatus) {
        return <Redirect to={"/users"} />;
    }

    return (
        <Box>
            {/* <AlertSuccess open={openState} message={message} handleClose={handleClose} */}
            <Grid container spacing={2} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom>
                        Login Form
                    </Typography>
                    <form className="" onSubmit={handleSubmit} id="loginForm" autoComplete='off' name="loginForm">
                        <Grid container spacing={3} mb={20}>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Email*"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={formState.values.username || ''}
                                    error={errors && errors['username'] ? true : false}
                                    helperText={errors && errors['username']}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password*"
                                    type="password"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    error={errors && errors['password'] ? true : false}
                                    helperText={errors && errors['password']}
                                    onChange={handleChange}
                                    value={formState.values.password || ''}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    SIGN IN
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12}>

                                {!loggedInStatus ? (
                                    <GoogleLogin
                                        clientId={CLIENT_ID}
                                        buttonText="Sign in with Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={"single_host_origin"}
                                        scope=''
                                        render={renderProps => (
                                            <Button
                                                onClick={renderProps.onClick} disabled={renderProps.disabled}
                                                variant="contained"
                                            >
                                                SIGN IN WITH GOOGLE
                                            </Button>
                                        )}
                                    />
                                ) : ""}
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Box >
    );
}