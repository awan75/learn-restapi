import Blog from "../models/blog.model.js";

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

        const blog = new Blog({
            title,
            description,
            image,
            user
        })

        try {
            await blog.save()
        } catch(err) {
            return console.log({message: err.message})
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
        deletingBlog = await Blog.findByIdAndDelete(id);
    } catch (err) {
        return console.log({message: err.message})
    }
    if(!deletingBlog) {
        return res.status(404).json({message: "data is not found"})
    }
    return res.status(200).json({message: "success deleting blog"})
}