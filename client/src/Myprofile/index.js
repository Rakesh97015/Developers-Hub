// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function MyProfile(props) {

//   const Nav =()=>{
//     useNavigate('/MyReviews')
//   }

//   const [profile, setProfile] = useState({});
//   const [taskProviderrating, setTaskProvider] = useState(null);

//   const option = useMemo(() => ({
//     headers: {
//       Authorization: `Bearer ${Cookies.get('Jwt_Token')}`,
//     },
//   }), []);


  
//   useEffect(() => {
//     axios.get("http://localhost:5000/myprofile", option)
//       .then((res) => {
//         const myprofile = res.data;
//         setProfile(myprofile.user);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the profile!", error);
//       });
//   }, [option]);

  
//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     const review = {
//       taskWorkers: profile.id,
//       rating: taskProviderrating,
//     };

//     axios.post("http://localhost:5000/addreview", review, option)
//       .then((res) => {
//         console.log(review)
//         alert("Review submitted successfully", res.data);
//       })
//       .catch((error) => {
//         console.error("There was an error submitting the review!", error);
//         console.log(review)
//       });
//   };

//   return (
//     <>
//     <div className="container d-flex flex-column justify-content-center align-items-center min-vh-80 bg-success text-white text-center">
//       <div className="display-1 mb-4">👮🏻</div>
//       <h5 className="mb-2">{profile.fullname}</h5>
//       <h6>{profile.email}</h6>
//     </div>
//       <form onSubmit={handleReviewSubmit}>
//         <h1>Review and Ratings</h1>
        
//         <input type='number' onChange={(e) => setTaskProvider(e.target.value)} />
//         <button type="submit">Submit</button>
//       </form>
//       <h6>{props.taskProvider}</h6>
//         <h6>{props.rating}</h6>
//     </>
//   );
// }

// export default MyProfile;


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyProfile({ taskProvider, rating }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [taskProviderrating, setTaskProvider] = useState(null);

  const option = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${Cookies.get('Jwt_Token')}`,
    },
  }), []);

  useEffect(() => {
    axios.get("http://localhost:5000/myprofile", option)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile!", error);
      });
  }, [option]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      taskWorkers: profile.id,
      rating: taskProviderrating,
    };

    axios.post("http://localhost:5000/addreview", review, option)
      .then((res) => {
        alert("Review submitted successfully", res.data);
      })
      .catch((error) => {
        console.error("There was an error submitting the review!", error);
      });
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-80 bg-success text-white text-center">
        <div className="display-1 mb-4">👮🏻</div>
        <h5 className="mb-2">{profile.fullname}</h5>
        <h6>{profile.email}</h6>
      </div>
      <form onSubmit={handleReviewSubmit}>
        <h1>Review and Ratings</h1>
        <input type='number' onChange={(e) => setTaskProvider(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h6>{taskProvider}</h6>
      <h6>{rating}</h6>
    </>
  );
}

export default MyProfile;
