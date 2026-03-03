const mongoose=require('mongoose');

const resumeSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        filename:{
            type:String
        },
        fileUrl:{
            type:String,
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
mongoose.exports=mongoose.model('Resume',resumeSchema);
