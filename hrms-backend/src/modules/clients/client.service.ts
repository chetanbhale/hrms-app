import { ApiError } from "../../utils/ApiError";
import { User } from "../user/user.model";
import { IClient } from "./client.interface";
import { Client } from "./client.model";
import bcrypt from "bcryptjs"
export const createClientService = async (data: IClient) => {
  const existing = await Client.findOne({
    companyEmail: data.companyEmail,
  });

  if (existing) {
    throw new ApiError(400, "Client with this email already exists");
  }
  // Create client first
  const client = await Client.create({
    companyName: data.companyName,
    companyEmail: data.companyEmail,
    subscriptionPlan: data.subscriptionPlan,
    createdBy: data.createdBy
  });
    // Hash password
  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  // Create CLIENT_ADMIN user
  await User.create({
  name: data.companyName,
  email: data.companyEmail,
  password: hashedPassword,
  role: "CLIENT_ADMIN",
  clientId: client._id.toString(),
});

  return client;
};

export const getAllClientsService = async (page:number,limit:number) =>{
        const skip = (page - 1)*limit;
        const[clients,total] = await Promise.all([
            Client.find({isActive:true}).skip(skip).limit(limit).sort({createdAt:-1}),
            Client.countDocuments({isActive:true})
        ]);
        return{
            data:clients,
            total,
            page,
            totalPages: Math.ceil(total/limit)
        }
        
}

export const getcientByIdService =  async (id:string) =>{
    const client = await Client.findById(id);
      if (!client || !client.isActive) {
    throw new ApiError(404, "Client not found");
    }
    return client
}

export const updateClientService  = async (id:string,data:Partial<IClient>)=>{
  const updated = await Client.findByIdAndUpdate(id,data,{new:true});
    if (!updated) {
    throw new ApiError(404, "Client not found");
  }
  return updated
}

export const deleteClientService = async (id:string)=>{
  const deleted = await Client.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!deleted) {
    throw new ApiError(404, "Client not found");
  }

  return deleted;
}