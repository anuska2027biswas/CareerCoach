const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            trim:true,
            unique : true 
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
        },
        UseRole:{
            type:String,
            enum:['Candidate','Recruiter'],
            required:true,
        },
        userPassword : {
            type : String , 
            unique : false ,
            required : true ,
        }

    },
    {timestamps:true}
);

module.exports=mongoose.model('User',UserSchema);