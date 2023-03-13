import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from './../context/Notes/NoteContext';

const Login = () => {
  const {setAlertMessage}=useContext(NoteContext);
  let navigate =useNavigate(); 
  const [loginData,setLoginData]=useState({
    email:'',
    password:''
  })
  const onchangeFeild=(e)=>{
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value

    })
  }
  const handleSubmit=async()=>{
      if(loginData.email.length === 0)
      {
        return setAlertMessage('Enter valid Email');
      }
      if(loginData.password.length === 0)
      {
        return setAlertMessage('Enter Password');
      }
      try {
        // /api/auth/login
        const res = await fetch('/api/auth/login',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(loginData)
        })
        const data= await res.json();
        // console.log(data);
        if(!data.success)
        {
        return setAlertMessage(data.error);

        }
        // return setAlertMessage("success");
        localStorage.setItem("token",data.authtoken);
        // history.push('/');
        navigate('/');

      } catch (error) {
         setAlertMessage('Error Occoured');
        
      }
  }
  return (
    <>
          <div className="container my-5 py-5 col-md-6">
            <h1 className='text-center '>Login Form</h1>
            <form method='post' onSubmit={(e)=>e.preventDefault()} className='mt-5'>
              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter Email' className="form-control"  name='email' value={loginData.email} onChange={onchangeFeild} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter Password' className="form-control " name='password'  value={loginData.password} onChange={onchangeFeild} />
              </div>
              <div className="mb-3">
              <button onClick={handleSubmit} className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
    </>
  )
}

export default Login