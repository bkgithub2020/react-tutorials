import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogout } from "react-google-login";
import { setLoggedInStatus } from '../../redux/thunk/googleAuthThunk';

import { Link } from "react-router-dom";
import Box from '@mui/material/Box';


const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#ffffff",
        paddingRight: "79px",
        paddingLeft: "118px",
    },
    mainHeader: {
        marginBottom: "100px",
    },
}));

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function Header() {
    const { header, mainHeader } = useStyles();
    const dispatch = useDispatch();
    const loggedInStatus = useSelector((state) => state.googleAuthReducer.isLoggedIn);

    const logout = () => {
        dispatch(setLoggedInStatus(false));
    }

    return (
        <header className={mainHeader}>
            <AppBar className={header}>
                <Toolbar>
                    <Box>
                        <Link to="/student-list">
                            <Button>
                                Student List
                            </Button>
                        </Link>
                        <Link to="/student-statics">
                            <Button>
                                Student Statics
                            </Button>
                        </Link>
                        <Link to="/simpleform">
                            <Button>
                                Simple Form
                            </Button>
                        </Link>
                        <Link to="/stepform">
                            <Button>
                                Step Form
                            </Button>
                        </Link>
                        <Link to="/calendar">
                            <Button>
                                Calendar
                            </Button>
                        </Link>
                    </Box>
                    <Box>
                        {
                            loggedInStatus ? (
                                <GoogleLogout
                                    clientId={CLIENT_ID}
                                    buttonText="Logout"
                                    onLogoutSuccess={logout}
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                        >
                                            Logout
                                        </Button>
                                    )}
                                >
                                </GoogleLogout>
                            ) : (
                                <Link to="/login">
                                    <Button>Login</Button>
                                </Link>
                            )
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}