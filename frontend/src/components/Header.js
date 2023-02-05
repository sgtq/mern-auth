import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

const Header = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

    const logoutRequest = async () => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/logout`, null, {
            withCredentials: true,
        });
        if (res.status === 200) {
            return res;
        }

        return new Error("Unable to log out");
    };

    const handleLogout = async () => {
        logoutRequest().then(() => {
            dispatch(authActions.logout());
        });
    };

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h3">MERN Auth</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            textColor="inherit"
                            indicatorColor="secondary"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            {!isLoggedIn && (
                                <>
                                    <Tab label="Login" LinkComponent={Link} to="/login" />
                                    <Tab label="Sign Up" LinkComponent={Link} to="/signup" />
                                </>
                            )}
                            {isLoggedIn && <Tab label="Logout" LinkComponent={Link} to="/" onClick={handleLogout} />}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
