import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(confirmAuthentication);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
