import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

const Header = () => {
    const [value, setValue] = useState();

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h3">MERN Auth</Typography>
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            textColor="inherit"
                            indicatorColor="secondary"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            <Tab label="Login" />
                            <Tab label="Sign Up" />
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
