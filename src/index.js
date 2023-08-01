import 'dotenv/config.js'
import express from "express";
import { connectDB } from "./config/mongo.js";
import router from './router/index.js';
import createRoles from './libs/init.js';

const app = express();
const PORT = process.env.PORT || 3000

connectDB()
createRoles()
app.use(express.json())
app.use('/v1', router)


app.listen(PORT, () => {
  console.log(`listening on: http://localhost:${PORT}`)
})
