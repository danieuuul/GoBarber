import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarService);

    const user = await updateAvatar.run({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
