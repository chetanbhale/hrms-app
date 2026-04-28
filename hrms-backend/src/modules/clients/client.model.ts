import { model, Schema } from "mongoose";
import { IClient } from "./client.interface";

const clientSchema = new Schema<IClient>({
    companyEmail:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    companyName:{
        type:String,
        required:true,
        trim:true,
    },
        phone: {
      type: String,
    },
    address: {
      type: String,
    },
    subscriptionPlan:{
        type:String,
        enum:["FREE", "PRO", "ENTERPRISE"],
        default:"FREE"
    },
        isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Client = model<IClient>('Client',clientSchema)