import axios from 'axios'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {

    const [data,setData]=useState(
        {
            "fullname":"",
            "email":"",
            "mobile":"",
            "skill":"",
            "password":"",
            "confirmpassword":""
            
    })

   const onChangeHandiler=(e)=>{
     setData({...data,[e.target.name]:e.target.value})
   }


   const onSUbmitHandiler=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/register",data)
    .then((res)=>alert(res.data))
    .catch((error)=>console.log("error: "+error))
   }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-success overflow-hidden">
    <form  onSubmit={onSUbmitHandiler} >
    <h1>Register</h1>
    <div className="input-group mb-3">
    <span className="input-group-text">fullname</span>
    <input type='text' placeholder='Enter Your Name' className="form-control" name='fullname' onChange={onChangeHandiler}></input><br/><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text">Email</span>
    <input type='email' placeholder='Enter Your Email' className="form-control" name='email' onChange={onChangeHandiler}></input><br/><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text">mobile</span>
    <input type='text' placeholder='Enter Your Email' className="form-control" name='mobile' onChange={onChangeHandiler}></input><br/><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text">skill</span>
    <input type='text' placeholder='Enter your Skills' className="form-control" name='skill' onChange={onChangeHandiler}></input><br/><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text">password</span>
    <input type='password' placeholder='Create password' className="form-control" name='password' onChange={onChangeHandiler} ></input><br/><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text">confirmpassword</span>
    <input type='password' placeholder='confirmpassword' className="form-control" name='confirmpassword' onChange={onChangeHandiler}></input><br/><br/>
    </div>
    
       <button>submit</button>
    {/* <input type='submit'></input> */}
    <h6 className="mt-3">Already have an account? <a href="/login" className="text-light">Login</a></h6>
    </form>
    </div>
  )
}

export default Register