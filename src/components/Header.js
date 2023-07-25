import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import './header.css'
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
// const server = "https://mern-authentication-tjud.onrender.com";
const server = "http://localhost:8080"




export default function Header() {

  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goDashboard = () => {
    history("/dashboard")
  }

  const goLogin = () => {
    history("/")
    // history("*")
    // alert("User not found... Login first")
  }

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`${server}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      // credentials: "include"
    })
    const data = await res.json();

    if (data.status === 201) {
      // console.log("user logout")
      localStorage.removeItem("usersdatatoken");
      setLoginData(false)
      history("/")
    } else {
      console.log("error")
    }
  }
  return (
    <div>
      <header>
        <nav><h1>hp Cloud</h1>

          {
            logindata.ValidUserOne ? <Avatar className='avtar' style={{ backgroundColor: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()} </Avatar>
              : <Avatar className='avtar' style={{ backgroundColor: "blue" }} onClick={handleClick} />

          }

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {
              logindata.ValidUserOne ? (
                <div>
                  <MenuItem onClick={() => { goDashboard(); handleClose(); }}>Profile</MenuItem>
                  <MenuItem onClick={() => { logoutuser(); handleClose(); }}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => {
                    goLogin();
                    handleClose();
                  }}>Login</MenuItem>
                </div>
              )
            }

          </Menu>
        </nav>
      </header>
    </div>
  )
}
