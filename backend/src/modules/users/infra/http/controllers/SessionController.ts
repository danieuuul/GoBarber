import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, token } = await createSession.run({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
