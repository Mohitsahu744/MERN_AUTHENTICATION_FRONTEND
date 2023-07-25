import React, { useState } from 'react'

const server = "http://localhost:8080"

export default function PasswordReset() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    console.log(email)

    const sendLink = async (e)=>{
        e.preventDefault();

        const res = await fetch(`${server}/sendpasswordlink`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email})
        });
        const data = await res.json();
        
        if(data.status === 201){
            setEmail("")
            setMessage(true)
        }
        else{
            alert("Invalid user")
        }
    }
  return (
    <div>
           <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Enter Your Email</h1>
                    </div>
                    {
                        message ? <p style={{color:"green", fontWeight:"bold"}}>password reset link send successfully in your email</p>:""
}
                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <button className='btn' onClick={sendLink}>Send</button>
                    </form>
                </div>
            </section>
    </div>
  )
}
