import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

let firstRender = true;

const Home = () => {
    const [user, setUser] = useState();

    const refreshToken = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_SERVER_URI}/auth/refresh`, {
                withCredentials: true,
            })
            .catch((err) => console.error(err));
        const data = await res.data;

        return data;
    };

    const getUser = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_SERVER_URI}/users/`, {
                withCredentials: true,
            })
            .catch((err) => console.log(err));

        const user = await res.data;
        console.log(user);

        return user;
    };

    useEffect(() => {
        if (firstRender) {
            firstRender = false;
            getUser().then((data) => setUser(data));
        }

        let interval = setInterval(() => {
            refreshToken().then((data) => setUser(data));
        }, 1000 * 15);

        return () => clearInterval(interval);
    }, []);

    return <div>{user && <h1>{user.fname}</h1>}</div>;
};

export default Home;
