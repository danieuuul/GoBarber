import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouters = Router();

sessionsRouters.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSession = new CreateSessionService();

  const { user, token } = await createSession.run({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouters;
