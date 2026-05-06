import mongoose from "mongoose"
import { config } from "./env"

export const connectDB =  async ()=>{
    try {
        await mongoose.connect(config.mongoUri);
        console.log("DB Connected sucessfully")

    }catch (error){
        console.log("Somthing went wrong in DB connection",error,config.mongoUri)
        process.exit(1)
    }
}