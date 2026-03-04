const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        technicalRound: [String],
        experienceRound: [String],
        hrRound: [String],
  },
  { timestamps: true }
    
)
module.exports=mongoose.model("Interview",interviewSchema);

