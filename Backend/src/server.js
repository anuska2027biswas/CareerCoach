import express from 'express';
import 'dotenv/config';
import interviewRoutes from "./routes/interviewRoutes.js";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const  PORT = process.env.PORT || 8001;
const app = express();
connectDB();
app.use(express.json());

app.get('/health' , (req,res) => {
  return res.status(200).json({
    success : true ,
    message : "Server is LIVE"
  })
})

app.use('/api/interview' , interviewRoutes);
app.use('/api/resume' , resumeRoutes);

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`); 
})