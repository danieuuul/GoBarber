import { Router } from 'express';

import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const appointmentsRouter = Router();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(confirmAuthentication);

appointmentsRouter.get('/', providerAppointmentsController.index);

export default appointmentsRouter;
