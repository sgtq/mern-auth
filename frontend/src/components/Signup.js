import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputsChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		
		const { data } = await axios.
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    width={300}
                    marginLeft="auto"
                    marginRight="auto"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2">Sign up</Typography>
                    <TextField
                        name="name"
                        value={inputs.name}
                        margin="normal"
                        variant="outlined"
                        placeholder="Name"
                        onChange={handleInputsChange}
                    />
                    <TextField
                        name="email"
                        type={"email"}
                        value={inputs.email}
                        margin="normal"
                        variant="outlined"
                        placeholder="Email"
                        onChange={handleInputsChange}
                    />
                    <TextField
                        name="password"
                        type={"password"}
                        value={inputs.password}
                        margin="normal"
                        variant="outlined"
                        placeholder="Password"
                        onChange={handleInputsChange}
                    />
                    <Button type="submit" variant="contained">
                        Sign up
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Signup;
