import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home.js';
import Login from './Login.js/Index.js';
import Dashboard from './Dashboard.js/index.js';
import Register from './Register.js/index.js';
 import Myprofile from './Myprofile/index.js';
 import MyReviews from './MyReviews.js/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/> 
      <Route path='/Myprofile' element={<Myprofile/>}/> 
       <Route path='/MyReviews' element={<MyReviews/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


