import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserController from '@modules/users/infra/http/controllers/UserController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const usersRouters = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const avatarController = new AvatarController();
const profileController = new ProfileController();

usersRouters.post('/', async (request, response) => {
  userController.create(request, response);
});

usersRouters.use(confirmAuthentication);

usersRouters.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => avatarController.update(request, response),
);

usersRouters.get('/profile', async (request, response) =>
  profileController.show(request, response),
);

usersRouters.put('/profile', async (request, response) =>
  profileController.update(request, response),
);

export default usersRouters;
