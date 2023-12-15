import express from "express";
import { getAllBlog, addBlog, updateBlog, getById, deleteBlog } from "../controllers/blog-controller.js";
const Router = express.Router();

Router.get('/', getAllBlog);
Router.post('/add', addBlog);
Router.put('/update/:id', updateBlog);
Router.get('/:id', getById);
Router.delete('/delete/:id', deleteBlog)
export default Router


