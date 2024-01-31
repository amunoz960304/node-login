import express from 'express';
import { login } from '@controllers/authController';

const routes = express.Router();

routes.post('/login', login);

export default routes;