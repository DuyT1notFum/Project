import React, { useState } from 'react'
import '../Pages/CSS/LoginSignup.css'
const LoginSignup = () => {
  const [state,setState]= useState("Login")

  const[formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandle = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const login = async (event)=>{
    event.preventDefault();
    console.log('Login Function Executed',formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    .then((response)=>response.json())
    .then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }

  const signup = async (event)=>{
    event.preventDefault();
    console.log('Signup Function Executed',formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    .then((response)=>response.json())
    .then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors)
    }
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <form onSubmit={state === "Login" ? login : signup}>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input value={formData.username} onChange={changeHandle} name='username' type="text" placeholder='Your Name' required/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandle} type="email" placeholder='Email Address' required />
          <input name='password' value={formData.password} onChange={changeHandle} type="password" placeholder='Password' required/>
        </div>
        <button type="submit">Continute</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have an acount? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing,i agree to the terms of use & privacy policy</p>
        </div>
        </form>
      </div>
    </div>
  )
}

export default LoginSignup