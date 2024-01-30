import jwt from 'jsonwebtoken';

const generateJWT = (id: number) => {
  return jwt.sign( { id }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h'
  })
}

export default generateJWT;  