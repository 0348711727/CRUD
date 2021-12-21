import express from 'express'
import mongoose from 'mongoose'
const app = express();
import dotenv from 'dotenv'

// import { dbConfig } from './config.js'
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
import productRoute from "./routes/product.js"
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.json('Hello')
})
//route
app.use("/products", productRoute)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})