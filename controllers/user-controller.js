import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find().select('-password')
    }catch (err) {
        return console.log(err)
    }
    if(!users || users.length < 1) {
        return res.status(404).json({message: 'no users found'})
    }
    return res.status(200).json({users})
}

export const signup = async (req, res, next) => {
    const {name, email, password} = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch(err) {
        return console.log(err)
    }
    if(existingUser) {
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await user.save()
    } catch(err) {
       return console.log(err)
    }
    return res.status(201).json({data: user, message: 'signup success'})
}

export const login = async (req, res, next) => {
    const {email, password} = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
       return res.status(404).json({message: 'could not found user by this email'})
    }
    
    const truePass = bcrypt.compareSync(password, existingUser.password)
    if(!truePass) {
        return res.status(401).json({message: 'wrong password'})
    }
    return res.status(200).json({message: "ok"})
}