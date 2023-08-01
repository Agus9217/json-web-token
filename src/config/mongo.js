import mongoose from "mongoose";

const URI = process.env.URI

export const connectDB = () => {
  try {
    mongoose.connect(URI)
    console.log('#### CONNECT OK ####')
  } catch (error) {
    console.log(`#### CONNECT ERROR: ${error.message} ####`)
  }
}