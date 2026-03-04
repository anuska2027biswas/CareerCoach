import mongoose from 'mongoose'

const resumeSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        fileUrl:{
            type:String,
            required:true,
        },
        ExtractedData:{
            summary:String,
            skills:[String],
            experience:[String],
            education:[String],
        },
    },
    {timestamps:true}
);


const ResumeModel = mongoose.model("Resume" , resumeSchema);

export default ResumeModel;
