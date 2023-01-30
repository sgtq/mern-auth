import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    const handleInputsChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios
            .post(`${process.env.REACT_APP_SERVER_URI}/users/signup`, {
                fname: inputs.fname,
                lname: inputs.lname,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;

        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendRequest().then(() => navigate("/login"));
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
                        name="fname"
                        value={inputs.fname}
                        margin="normal"
                        variant="outlined"
                        placeholder="First Name"
                        onChange={handleInputsChange}
                    />
                    <TextField
                        name="lname"
                        value={inputs.lname}
                        margin="normal"
                        variant="outlined"
                        placeholder="Last Name"
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
