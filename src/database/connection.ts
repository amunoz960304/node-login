import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    const url: string = process.env.MONGO_URL ?? '';
    await mongoose.connect(url);
  } catch (error) {
    console.error(error);
    throw new Error('Error al iniciar la base de datos');
  }
}

export default dbConnection;