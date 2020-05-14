import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class AvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateAvatarService);

    const user = await updateAvatar.run({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ user: classToClass(user) });
  }
}
