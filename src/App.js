import Header from './components/Header'
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useContext, useState } from 'react';
import { LoginContext } from './components/ContextProvider/Context';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';

// const port = "http://localhost:8009";
// const server = "https://mern-authentication-tjud.onrender.com";
const server = "http://localhost:8080"



function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);

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
      // console.log("user not valid")
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
          <>
            <Header />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/password-reset' element={<PasswordReset />} />
              <Route path='/forgotpassword/:id/:token' element={<ForgotPassword />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </>
        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }

    </>
  );
}

export default App;
