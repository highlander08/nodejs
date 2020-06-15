import 'reflect-metadata';

import express, {Request, Response, NextFunction, response} from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();
//adicinando todas as rotas dentro do app//
// requisição entender formato json//
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, reponse: Response, _: NextFunction)=>{
   if(err instanceof AppError){
     return response.status(err.statusCode).json({
       status: 'error',
       message: err.message,
     });
   }
   console.error(err);

   return reponse.status(500).json({
     status: 'error',
     message: 'internal server error',
   })
},
);


app.listen(3333, ()=>{
  console.log('❤ started');
});
