import { Router } from 'express';

import UserController from '@modules/users/infra/http/controllers/UserController';

const usersRouters = Router();

const userController = new UserController();

usersRouters.post('/', userController.create);

export default usersRouters;
