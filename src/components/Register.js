import React, { useState } from 'react'
import "./mix.css"
import { NavLink } from 'react-router-dom'

// const port = "http://localhost:8009";
// const server = "https://mern-authentication-tjud.onrender.com";
const server = "http://localhost:8080"



export default function Register() {
    const [passShow, setPassShow] = useState(false);
    const [conpassShow, setConPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        conpassword: ""
    })
    // console.log(inpval)

    const setVal = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const addUserdata = async (e)=>{
        e.preventDefault();

        const {fname, email, password, conpassword} = inpval;

        if(fname === ""){
            alert("please enter Your name")
        }else if(email === ""){
            alert("please enter your Email");
        }else if(!email.includes("@")){
            alert("enter valid email")
        }else if(password === ""){
            alert("enter your password")
        }else if(password.length < 6){
            alert("password must be 6 char")
        }else if(conpassword === ""){
            alert("enter your confirm password")
        }else if(conpassword.length < 6){
            alert("password must be 6 char")
        }else if(password !== conpassword){
            alert("password and confirm password not match")
        }else{
            
        const data = await fetch(`${server}/register`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname, email, password, conpassword
            })
        });
        const res = await data.json();
        // console.log(res.status)

        if(res.status === 201){
            alert("user registration done");
            setInpval({...inpval, fname:"", email:"", password:"", conpassword:""})    
        }else{
            alert("user already exist")
        }
    }
    }
    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br /> your tasks! We hope that you will get like it.</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
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
                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two'>
                                <input type={!conpassShow ? 'password' : 'text'} onChange={setVal} value={inpval.conpassword} name="conpassword" id="conpassword" placeholder='Enter Your Confirm password' />
                                <div className='showpass' onClick={() => { setConPassShow(!conpassShow) }}>
                                    {!conpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>
                            Already have an Account? <NavLink to="/">Log in</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}
