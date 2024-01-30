import { Request, Response } from 'express';
import { ICustomResponse } from '@/interfaces/interfaces';
import { ICustomRequest } from '@/types/custom';
import { 
  create as userCreate,
  update as userUpdate,
  deleteById as userDeleteById
} from '@/repositories/usersRepository';
import { IUser } from '@/models/User';

export const profile = (req: ICustomRequest, res: Response): Response => {
  return res.json(req.user);
}

export const create = async (req: Request, res: Response):Promise<Response<IUser> | ICustomResponse> => {
  try {
    const user: IUser = req.body;
    const newUser = await userCreate(user);
    return res.json(newUser);
  } catch (error: any) {
    return res.json({
      message: error.message
    }).status(error.code || 500);
  }
}

export const update = async (req: ICustomRequest, res: Response):Promise<Response<IUser> | ICustomResponse> => {
  try {
    const { body, user } = req;

    if(!user){
      return res.json({
        message: "No existe informacion el usuario"
      }).status(400);
    }

    const newUser = await userUpdate(user, body);
    return res.json(newUser);
  } catch (error:any) {
    return res.json({
      message: error.message
    }).status(error.code || 500);
  }
}

export const deleteById = async (req: Request, res: Response): Promise<Response<ICustomResponse>> => {
  try {    
    const { id } = req.params;
    await userDeleteById(id);
    return res.json({
      message: 'Usuario eliminado correctamente'
    })
  } catch (error: any) {
    return res.json({
      message: error.message,
    }).status(error.code || 500);
  }
}