import express from 'express';
import 'dotenv/config';


const  PORT = process.env.PORT || 8001;
const app = express();


app.get('/health' , (req,res) => {
  return res.status(200).json({
    success : true ,
    message : "Server is LIVE"
  })
})


app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`); 
})