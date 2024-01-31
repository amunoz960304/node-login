import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { ICustomResponse, ILogin } from '@interfaces/interfaces';
import { IUser } from '@models/User';
import generateJWT from '@helpers/generateJWT';
import { getByEmail } from '@repositories/usersRepository';

export const login = async (req: Request, res: Response): Promise<Response<ICustomResponse>|Response> => {

  const { email, password }: ILogin = req.body;

  const user: IUser|null = await getByEmail(email);

  if(!user){
    return res.status(404).json({
      message: 'Email o password incorrectos'
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if(!match){
    return res.status(403).json({
      message: 'Email o password incorrectos'
    });
  }

  user.token = generateJWT(user._id);

  return res.json(user);
}