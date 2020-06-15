import { Router  } from 'express';
import multer from "multer";
import uploadcConfig from "../config/upload";

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
// função da rota = receber requisição && chamar outro arquivo, e devolver uma resposta//
const usersRouter = Router();

const upload = multer(uploadcConfig);
// Soc: separation of concerns (separação de preucupação)//
// DTO = data transfer ojject
usersRouter.use(ensureAuthenticated);

usersRouter.post('/', async (request, response)=>{
  const {name, email, password} = request.body;

  const createUser = new CreateUserService();

  const user =  await createUser.execute({
    name,
    email,
    password,
  });
  // deletando o usario do banco de dados //
  delete user.password;

  return response.json(user);

});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request,response)=>{
    const UpdateUserAvatar = new UpdateUserAvatarService();
    const user = await UpdateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.fieldname,
    });

    delete user.password;

    return response.json(user);

  },
  );
  export default usersRouter;
