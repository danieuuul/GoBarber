import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionsRouters = Router();

const sessionController = new SessionController();

sessionsRouters.post('/', sessionController.create);

export default sessionsRouters;
