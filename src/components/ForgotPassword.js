import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const server = "http://localhost:8080"

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [data2, setData2] = useState(false)
  const { id, token } = useParams();
  const history = useNavigate();


  const userValid = async () => {
    const res = await fetch(`${server}/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    if (data.status === 201) {
      console.log("user valid")
    } else {
      history('*')
    }
  }

  const sendpassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`${server}/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });
    const data = await res.json()

    if (data.status === 201) {
      setPassword("")
      setMessage(true)
    } else {
      alert("! Token Expired generate new Link")
    }

  }

  useEffect(() => {
    userValid()
    setTimeout(() => {
      setData2(true)
    }, 3000)
  }, [])
  return (
    <div>
      {
        data2 ? (<>
          <section>
            <div className='form_data'>
              <div className='form_heading'>
                <h1>Enter Your New Password</h1>
              </div>
              {
                message ? <p style={{ color: "green", fontWeight: "bold" }}> Password update successfully </p> : ""
              }
              <form>
                <div className='form_input'>
                  <label htmlFor='password'>New Password</label>
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Enter Your New Password' />
                </div>
                <button className='btn' onClick={sendpassword}>Send</button>
              </form>
              {
                message ? <p>
                  Password has been updated you can login <NavLink to="/">Log in</NavLink>
                </p> : ""
              }
            </div>
          </section>
        </>
        ) :
          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
            Loading... &nbsp;
            <CircularProgress />
          </Box>
      }</div>
  )
}
