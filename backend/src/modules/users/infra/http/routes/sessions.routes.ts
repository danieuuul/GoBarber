import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionsRouters = Router();

const sessionController = new SessionController();

sessionsRouters.post('/', async (request, response) =>
  sessionController.create(request, response),
);

export default sessionsRouters;
