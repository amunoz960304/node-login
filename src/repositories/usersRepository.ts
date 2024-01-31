import CustomError from '@errors/CustomError';
import UserModel, { IUser } from '@models/User';

export const getByEmail = async (email: string): Promise<IUser|null> => {
  return await UserModel.findOne({email});
}

export const create = async (data: IUser): Promise<IUser> => {
  const newUser = await UserModel.create(data);

  if(!newUser){
    throw new CustomError(`Error al crear el usuario`, 500);
  }
  return newUser;
}

/**
 * @param user current user data
 * @param data new user data
 */
export const update = async (user: IUser, data: IUser): Promise<IUser> => {


  user.email = data.email ?? user.email;
  user.name = data.name ?? user.name;
  user.lastname = data.lastname ?? user.lastname;
  user.password = data.password ?? user.password;

  try {
    return await user.save();
  } catch (error) {
    throw new CustomError('Error al actualizar el usuario', 500);
  }
}

export const getById = async (id: string): Promise<IUser|null> => {
  return await UserModel.findById(id);
}

export const deleteById = async (id: string): Promise<boolean> => {
  const user = await UserModel.findByIdAndDelete(id);

  if(!user){
    throw new CustomError(`Error al eliminar usuario con el id ${id}`, 404);
  }
  return true;
}