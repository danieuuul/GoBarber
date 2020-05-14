import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(confirmAuthentication);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create,
);

export default appointmentsRouter;
