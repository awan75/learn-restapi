import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getAllBlog = async (req, res, next) => {
    let gettedBlog;
    try {
    gettedBlog = await Blog.find()
    } catch (err) {
        return console.log({message: err.message})
    }
    if(!gettedBlog || gettedBlog.length < 1) {
        return res.status(404).json({message: 'blog not found'})
    }
    res.status(200).json({"data":gettedBlog})
}

export const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch(err) {
        console.log(err)
    }
    if(!existingUser) {
        return res.status(404).json({message: "user is not found"})
    }
        const blog = new Blog({
            title,
            description,
            image,
            user
        })

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await blog.save({session})
            existingUser.blog.push(blog)
            await existingUser.save({session})
            await session.commitTransaction();
        } catch(err) {
            console.log({message: err.message})
            return res.status(500).json({message: err})
        }
        return res.status(200).json({"data": blog, message: "success adding data"})
};

export const updateBlog = async (req, res, next) => {
    const {id} = req.params
    const {title, description} = req.body

    let updatedBlog;
    try {
        updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            description
        });
    } catch (err) {
        return console.log({message: err.message});
    }
    if(!updatedBlog) {
        return res.status(500).json({message: "blog is not found"})
    }

    res.status(200).json({"data": updatedBlog})
}

export const getById = async (req, res, next) => {
    const {id} = req.params;

    let gettedBlog;
    try {
        gettedBlog = await Blog.findById(id)
    } catch(err) {
        return console.log({message: err.message})
    }
    if(!gettedBlog || gettedBlog.length < 1) {
        return res.status(404).json({message: "blog is not found"})
    }
    return res.status(200).json({"data": gettedBlog})
}

export const deleteBlog = async(req, res, next) => {
    const {id} = req.params

    let deletingBlog;
    try {
        deletingBlog = await Blog.findByIdAndDelete(id).populate('user');
        await deletingBlog.user.blog.pull(deletingBlog)
        await deletingBlog.user.save()
    } catch (err) {
        return console.log({message: err.message})
    }
    if(!deletingBlog) {
        return res.status(404).json({message: "data is not found"})
    }
    return res.status(200).json({message: "success deleting blog"})
}

export const getBlogByUser = async(req, res, next) => {
    const {id} = req.params
    let userBlog;
    try {
        userBlog = await User.findById(id).populate('blog');
    } catch(err) {
        return console.log(err)
    }
    if(!userBlog) {
        return res.status(400).json({message: err})
    }
    res.status(200).json({blogs: userBlog.blog})
}