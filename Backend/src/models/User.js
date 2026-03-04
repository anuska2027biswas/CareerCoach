const mongoose=require('mongoose');
//const bcrypt = require("bcryptjs");
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
/* Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; 
*/
module.exports=mongoose.model('User',UserSchema);