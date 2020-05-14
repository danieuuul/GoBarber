import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const profileRouters = Router();

const profileController = new ProfileController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

profileRouters.use(confirmAuthentication);

profileRouters.get('/', profileController.show);

profileRouters.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
      password_confirmation: Joi.string()
        .when('old_password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        })
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouters.patch(
  '/avatar',
  upload.single('avatar'),
  avatarController.update,
);

export default profileRouters;
