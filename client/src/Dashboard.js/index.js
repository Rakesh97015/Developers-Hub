import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
   const [allProfiles, setAllProfiles] = useState([])
   const navigate = useNavigate();

   const Nav=()=>{
      navigate('/Myprofile')
   }

   const logout = () => {
      Cookies.remove('Jwt_Token');
      navigate('/login');
  };
  
  const getdeta =() => {
   const  option = {
    method: 'GET',
          headers: {
             Authorization: `Bearer ${Cookies.get('Jwt_Token')}`,
          },
    }
    axios.get("http://localhost:5000/allprofiles", option)
       .then(response => {
          setAllProfiles(response.data);
       })
       .catch(error => {
          // console.error("There was an error fetching the profiles!", error);
       });
    }

  useEffect(()=>{
  
         getdeta()
   },[])
     

   return (
     <div className='bg-dark'>   
    <div className='d-flex align-items-center justify-content-between'>
    <h1 className='ms-5 text-info'>Developers</h1>
    <button className='btn btn-primary me-5' onClick={logout}>Log Out</button>
     </div>
     
       {allProfiles.map((profile) => {
        const skills = profile.skill.split(',')
        return(
         <div className='container card mb-1 bg-secondary' style={{ width: '95%', height: '16rem' }} key={profile.fullname}>
           <div className='d-flex align-items-center p-4'>
              <div className='flex-shrink-0 me-4' style={{ fontSize: '2rem' }}>
              <div style={{ fontSize: '9rem'}}>👮🏻</div>
              </div>
              <div >
                <h5>{profile.fullname}</h5> 
                <h6>{profile.email}</h6>
                <button className="btn btn-info" onClick={Nav}>View Profile</button> 
              </div>
              <div className='flex-shrink-0 me-5'>
                <ul>
                 {skills.map((oneskill, index) => (
                 <li key={index} style={{ fontSize: '1.1rem' }}>{oneskill}</li>
                  ))}
                 </ul>
              </div>
           </div>
         </div>
         
       )})}   
     </div>
   )
}

export default Dashboard;


