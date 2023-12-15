import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes/user.routes.js';
import routerBlog from './routes/blog.routes.js';


const dbUrl = process.env.DB_URL
const PORT = process.env.Port;

const app = express();

app.use(express.json())
app.use('/api/user', router)
app.use('/api/blog', routerBlog)

mongoose.connect(dbUrl)
.then(() => {
    app.listen(PORT)
}).then(() => {
    console.log('connected to mongodb and listening on  localhost 5000')
}).catch((err) => {
    console.log(err.message)
})



