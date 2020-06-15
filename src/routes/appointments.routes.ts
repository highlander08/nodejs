
import { Router } from 'express';
import { getCustomRepository } from "typeorm";

import { parseISO   } from "date-fns";
import AppointmentsRepository from  '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
// função da rota = receber requisição && chamar outro arquivo, e devolver uma resposta//

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
// Soc: separation of concerns (separação de preucupação)//
// DTO = data transfer ojject
appointmentsRouter.get('/', async  (request, response)=> {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await  appointmentsRepository.find(); // chamando repositorio //

  return response.json(appointments); //  devolvendo respota //
});

appointmentsRouter.post('/', async (request, response)=>{
  const { provider_id, date } = request.body;

  // pegando data //
  const parsedDate = parseISO(date); // pega string e traanforma em data //

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);

});

export default appointmentsRouter;
