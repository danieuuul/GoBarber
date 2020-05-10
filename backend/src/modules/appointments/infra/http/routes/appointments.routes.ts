import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import confirmAuthentication from '@modules/users/infra/http/middlewares/confirmAuthentication';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(confirmAuthentication);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  appointmentController.create(req, res);
});

export default appointmentsRouter;
