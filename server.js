const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const devuser = require('./devusermodel');
const reviewmodel = require('./reviewmodel')
const mongoose = require('mongoose');
const bt = require('bcrypt');
const middleware = require('./middleware');

app.use(express.json());
app.listen(5000, () => console.log("Port number is 5000"));

app.use(cors({origin:'*'}));
app.get('/', (req, res) => {
    return res.send("Hello World");
});

mongoose.connect("mongodb://localhost:27017/devUser")
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB connection error:', err));

app.post('/register', async (req, res) => {
    try {
        const { fullname, email, mobile, skill, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match");
        }

        const exist = await devuser.findOne({ email });

        const hashedPassword = await bt.hash(password, 10);
        if (exist) {
            return res.status(200).send("Email already exists");
        } else {
            const user = new devuser({ fullname, email, mobile, skill, password: hashedPassword })
            await user.save();
            return res.status(201).send("User registered successfully");
        }
    } catch (err) {
        console.log("Error: " + err);
        return res.status(500).send("Internal Server Error");
    }
});

  
app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await devuser.findOne({ email });
      if (!user) {
          return res.status(400).send("Email does not exist");
      }
      
      const match = await bt.compare(password, user.password);
      
      if (!match) {
          return res.status(400).send("Incorrect password");
      }
      const payload = {  
          user: {
              id: user._id,
              fullname: user.fullname,
              email: user.email,
          }
      };
      const token = jwt.sign(payload, "jwtToken");
         return res.send({token}); 
      
  } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).send("Internal Server Error");
  }
});


  app.get('/myprofile', middleware, async (req, res) => {
    try {
       return res.send(req.user);
    } catch (err) {
        console.error("Error in myprofile:", err);
        return res.status(500).send('Internal server error');
    }
});


app.get("/allprofiles", middleware,async (req, res) => {
    try {
        const allprofiles = await devuser.find(); 
        return res.send(allprofiles); 
    } catch (err) { 
        return res.status(500).json({ error: "Failed to fetch profiles" });
    }
});

app.post('/addreview', middleware,async (req, res) => {
    try {
      const { taskWorkers, rating } = req.body;
      const userdata=req.user;
       console.log(userdata)
      const exist = await devuser.findById(userdata.user.id); 
      if (!exist) {
        return res.status(404).send("User not found");
      }   
      const newReview = new reviewmodel({
        taskProvider: exist.fullname,
        taskWorkers,
        rating
      });
  
      await newReview.save();
      return res.send("Added new review");
    } catch (error) {
      console.error("Error adding review:", error);
      return res.status(500).send("Review is not added");
    }
  });
  
  app.get('/myreviews', middleware, async (req, res) => {
    try {
      const allprofiles = await devuser.find(); 

       const allprofilesId=allprofiles.forEach(item => {
      });

      console.log(allprofilesId)
      const allReviews = await reviewmodel.find();
      if(allReviews){
      const myreviews = allReviews.filter(review => review.allprofilesId === req.user.id);
      res.json(myreviews);
      }else{
       res("no reviews")
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).send("An error occurred while fetching reviews.");
    }
  });
  
  
 