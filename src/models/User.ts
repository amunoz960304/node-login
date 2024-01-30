import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  lastname: string;
  token?: string
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  token: { type: String, required: false},
},{
  timestamps: true,
});

userSchema.pre('save', async function(next){
  
  if(!this.isModified('password')){
    next();
  }

  const password:any = this.password;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
});

userSchema.methods.validatePassword = async function(passwordForm: string) {
  return await bcrypt.compare(passwordForm, this.password);
}

userSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject();
  return user;
};

export default mongoose.model<IUser>('User', userSchema);