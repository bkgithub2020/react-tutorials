import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
} from "@material-ui/core";
import React from "react";
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

export default function Header() {
    const { header, mainHeader } = useStyles();

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
                    </Box>
                </Toolbar>
            </AppBar>
        </header>
    );
}