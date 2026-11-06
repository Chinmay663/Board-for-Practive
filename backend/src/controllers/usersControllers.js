import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js'
import { errors } from '@upstash/redis';

//e@desc user registration
//@route  POST /api/users
//@access Public
export const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists= await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const salt =await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);

    const user=await User.create({
        name,
        email,
        password: hashPassword
    });

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});


//@desc Authenticate User
//@route  POST /api/users/login
//@access Public
export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email});
    

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid credential');
    }
});

//@desc Get User data
//@route  Get /api/users/me
//@access Private
export const getUser=asyncHandler(async(req,res)=>{
    const {_id,name,email}=await User.findById(req.user.id);
    
    res.status(200).json({
        id: _id,
        name: name,
        email: email,
    });
});

//Generate JWT

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
};