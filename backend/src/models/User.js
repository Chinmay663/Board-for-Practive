import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add name'],
    },
    email:{
        type: String,
        required: [true,'Enter email'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Enter Password']
    },
},{
    timestamps: true,
});

const User = mongoose.model('User',userSchema);
export default User;
