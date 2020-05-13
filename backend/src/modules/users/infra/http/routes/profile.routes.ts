import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const profileRouters = Router();

const profileController = new ProfileController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

profileRouters.use(confirmAuthentication);

profileRouters.get('/', async (request, response) =>
  profileController.show(request, response),
);

profileRouters.put('/', async (request, response) =>
  profileController.update(request, response),
);

profileRouters.patch(
  '/avatar',
  upload.single('avatar'),
  avatarController.update,
);

export default profileRouters;
