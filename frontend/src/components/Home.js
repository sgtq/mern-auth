import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Home = () => {
    const [user, setUser] = useState();

    const sendRequest = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_SERVER_URI}/users/`, {
                withCredentials: true,
            })
            .catch((err) => console.log(err));

        const data = await res.data;

        return data;
    };

    useEffect(() => {
        sendRequest().then((data) => setUser(data));
    }, []);

    return <div>{user && <h1>{user.fname}</h1>}</div>;
};

export default Home;
