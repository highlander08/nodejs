// criação do agendamento //
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
* acesso ao repositorio
*/

//* recebimento das informaçoes//
interface Request {
  provider_id: string;
  date: Date;
}
// single responsibility principle (services & solid)//
class CreateAppointmentService {
  //depdedency inversion(SOLID) = indepedente de quantos serviços estejam trabalhando com agendamento
  // todos eles estejam utilizando o mesmo repositorio de agendamento//
  public async  execute({date,provider_id}: Request ): Promise <Appointment> { //* recebimento das informaçoes//
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // faz um agendamento de hora em hora //

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
      );
      //* tratativas de erros/excessoes//
      if(findAppointmentInSameDate){
        throw new AppError('this Appointment is already booked');
      }
      // usado parametro nomeado para criar o agendamento //
      // só cria a instancia do a classe(model)
        const appointment = appointmentsRepository.create({
        provider_id,
        date: appointmentDate,
      });

      await appointmentsRepository.save(appointment);

      return appointment;
    }
  }

  export default CreateAppointmentService;
