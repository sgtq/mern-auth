import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [value, setValue] = useState();

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
                            <Tab label="Login" LinkComponent={Link} to="/login" />
                            <Tab label="Sign Up" LinkComponent={Link} to="/signup" />
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
