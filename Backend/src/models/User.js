const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index:true,
        },
        role:{
            type:String,
            enum:['candidate','recruiter'],
            required:true,
        },
        profileImage:{
            type:String,
            default:"",
        },

    },
    {timestamps:true}
);
module.exports=mongoose.model('User',UserSchema);