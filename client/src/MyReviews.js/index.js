// import React, { useState, useEffect,useMemo } from 'react';
// import Cookies from 'js-cookie';
// import MyProfile from '../Myprofile';
// import axios from 'axios';

// const MyReviews = () => {
//   const [showReviews, setShowReviews] = useState([]);

//   const option = useMemo(() => ({
//     headers: {
//       Authorization: `Bearer ${Cookies.get('Jwt_Token')}`,
//     },
//   }), []);


// useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/myreviews',option); 
//         console.log(response.data)
//           setShowReviews(response.data)
//      console.log(showReviews)
//       } catch (error) {
//         console.log("respovbjnkml,/")
//         console.error('Error fetching reviews:', error.response || error.message || error);
//       }
//     };
  
//     fetchReviews();
//   }, []);
  

//   return (
//     <div>
//     <h6>Reviews</h6>
//     {showReviews.map((sr, index) => (
//       <div key={index}>
//         {/* <h5>{sr.taskProvider}</h5>
//         <h5>{sr.rating}</h5> */}
//         <MyProfile taskProvider={sr.taskProvider} rating={sr.rating} />
//       </div>
//     ))}
//   </div>
//   );
// };

// export default MyReviews

import React, { useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import MyProfile from '../Myprofile';
import axios from 'axios';

const MyReviews = () => {
  const [showReviews, setShowReviews] = useState([]);

  const option = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${Cookies.get('Jwt_Token')}`,
    },
  }), []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/myreviews', option);
        setShowReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.response || error.message || error);
      }
    };

    fetchReviews();
  }, [option]);

  return (
    <div>
      <h6>Reviews</h6>
      {showReviews.map((sr, index) => (
        <div key={index}>
          <MyProfile taskProvider={sr.taskProvider} rating={sr.rating} />
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
