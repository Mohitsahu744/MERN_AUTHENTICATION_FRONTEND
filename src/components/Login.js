import React, { useState } from 'react'
import "./mix.css"
import { NavLink, useNavigate } from 'react-router-dom'

// const port = "http://localhost:8009";
// const server = "https://mern-authentication-tjud.onrender.com";
const server = "http://localhost:8080"

export default function Login() {

    const [passShow, setPassShow] = useState(false);


    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    // console.log(inpval);

    const history = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginUser = async (e) => {
      
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            alert("please enter your Email");
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (password === "") {
            alert("enter your password")
        } else if (password.length < 6) {
            alert("password must be 6 char")
        } else {
            const data = await fetch(`${server}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const res = await data.json();
            // console.log(res)

            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token)
                history("/dashboard");
                setInpval({...inpval, email:"", password:""})
            }
            else{
                alert("Invalid details");
            }
        }
    }
    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? 'password' : 'text'} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className='showpass' onClick={() => { setPassShow(!passShow) }}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>
                            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
                        </p>
                        <p>
                            Forgot Password <NavLink to="/password-reset">Click Here</NavLink>
                        </p>
                    </form>
                </div>
            </section>
         
        </>
    )
}