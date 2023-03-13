import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from './../context/Notes/NoteContext';

const Signup = () => {
  const {setAlertMessage}=useContext(NoteContext);
  let navigate =useNavigate(); 
  const [loginData,setLoginData]=useState({
    name:"",
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
    if(loginData.name.length <= 5)
      {
        return setAlertMessage('Enter valid Name and Name must be in 5 character');
      }
      if(loginData.email.length <=5)
      {
        return setAlertMessage("Enter valid Email and Email must be in 5 character");
      }
      if(loginData.password.length <= 5)
      {
        return setAlertMessage("Enter valid Password and Password must be in 5 character");
      }
      try {
        // /api/auth/login
        const res = await fetch('/api/auth/createuser',{
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
        localStorage.setItem("token",data.authtoken);
         setAlertMessage("success Register");
        // history.push('/');
        // navigate('/');
        setTimeout(()=>{
    navigate('/');
        },2000)

      } catch (error) {
         setAlertMessage('Error Occoured');
        
      }
  }
  return (
    <>
          <div className="container my-5 py-5 col-md-6">
            <h1 className='text-center '>Register Form</h1>
            <form method='post' onSubmit={(e)=>e.preventDefault()} className='mt-5'>
            <div className="mb-3">
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter Name' className="form-control"  name='name' value={loginData.name} onChange={onchangeFeild} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter Email' className="form-control"  name='email' value={loginData.email} onChange={onchangeFeild} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter Password' className="form-control " name='password'  value={loginData.password} onChange={onchangeFeild} />
              </div>
              <div className="mb-3">
              <button onClick={handleSubmit} className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
    </>
  )
}

export default Signup