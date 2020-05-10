import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', async (request, response) =>
  forgotPasswordController.create(request, response),
);

passwordRouter.post('/reset', async (request, response) =>
  resetPasswordController.create(request, response),
);

export default passwordRouter;
