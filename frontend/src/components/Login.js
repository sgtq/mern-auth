import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
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
            .post(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;

        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendRequest().then(() => navigate("/"));
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
                    <Typography variant="h2">Log in!</Typography>
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
                        Log in
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Login;
