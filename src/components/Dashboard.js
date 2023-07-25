import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// const server = "https://mern-authentication-tjud.onrender.com";
const server = "http://localhost:8080"


export default function Dashboard() {

    const { logindata, setLoginData } = useContext(LoginContext);
    // console.log(logindata.ValidUserOne.fname)

    const [data, setData] = useState(false);

    const history = useNavigate();

    const dashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch(`${server}/validuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        const data = await res.json();

        if (data.status === 401 || !data) {
            history("*")
        } else {
            // console.log("user valid")
            setLoginData(data)
            history("/dashboard")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            dashboardValid();
            setData(true)
        }, 2000)

    }, [])
    return (
        <>
            {
                data ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop:"15%"}}>
                        <h3>Login successfully...</h3>
                        <h2>User Email: {logindata ? logindata.ValidUserOne.email : ""}</h2>
                        <h2>User Name: {logindata ? logindata.ValidUserOne.fname : ""}</h2>
                    </div>

                ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }

        </>
    )
}
