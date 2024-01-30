import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import authV1Routes from '@/routes/v1/authRoutes';
import userV1Routes from '@/routes/v1/usersRoutes';

import dbConnection from '@/database/connection';

dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());


app.use('/api/v1/auth/', authV1Routes);
app.use('/api/v1/users/', userV1Routes);

app.use( (_req, res) => {  
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

dbConnection().then((): void => {
  app.listen(port, (): void => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});


