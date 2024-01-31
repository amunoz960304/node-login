import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../types/custom';
import { getById } from '@repositories/usersRepository';

const checkAuth = async (req: ICustomRequest, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;
  let token;

  if(authorization && authorization.startsWith('Bearer')){
    try {
      token = authorization.split(' ')[1];
      const decoded: any = await jwt.verify(token, process.env.JWT_SECRET ?? '');

      const user = await getById(decoded.id);

      if(!user){
        return res.status(403).json({
          message: "Error de autenticacion"
        });
      }

      req.user = user;

      return next()
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  if(!token){
    return res.status(401).json({
      message: 'Token invalido'
    })
  }
 
  next();
}

export default checkAuth;