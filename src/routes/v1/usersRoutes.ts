import express from 'express';
import checkAuth from '@/middlewares/checkAuth';
import { create, deleteById, update, profile } from '@/controllers/usersController';

const routes = express.Router();

routes.get('/', checkAuth, profile);
routes.put('/', checkAuth, update);
routes.post('/', create);
routes.delete('/:id', checkAuth, deleteById);

export default routes;