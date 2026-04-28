import { RequestHandler } from "express";
import { createClientService, deleteClientService, getAllClientsService, getcientByIdService, updateClientService } from "./client.service";

export const createClient: RequestHandler = async (req, res) => {
   const client = await createClientService(req.body);
   
   res.status(201).json({ success: true, data: client });
};
export const getAllClients:RequestHandler = async(req,res) =>{
   const page  = Number(req.query.page) || 1;
   const limit = Number(req.query.limit)|| 10;
   const result  =  await getAllClientsService(page,limit);
   res.status(200).json({success:true, ...result})
}
export const getClientByID:RequestHandler = async(req,res)=>{
   const clineId = String(req.params.id)
   const client  = await getcientByIdService(clineId);
   res.status(200).json({success:true, data:client})
}

export const updateClientById:RequestHandler = async (req,res) =>{
const clineId = String(req.params.id);
const updateClient  = await updateClientService(clineId,  req.body);
    res.status(200).json({
      success: true,
      data: updateClient,
    });
  }

export const deleteClient: RequestHandler = 
  async (req, res) => {
   const id = String(req.params.id)
    await deleteClientService(id);

    res.status(200).json({
      success: true,
      message: "Client deactivated successfully",
    });
  }
 