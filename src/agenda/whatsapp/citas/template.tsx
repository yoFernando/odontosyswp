import { formatHour, formatZero, getEndHour, months, week } from '../../../common/helper';
import { ICita } from '../../hooks/useCitas';
import { IAgenda } from './../../hooks/useAgendas';
import { getTrimedDate } from './../../../common/helper';

export default function template(text: string, cita: ICita, agenda: IAgenda){ 
    let fecha = getTrimedDate(cita.Fecha);
    
    text = text.replace(new RegExp('#inicioCita#', 'g'), formatHour(cita.Hora)); // "Se reemplaza con la hora de inicio de la cita."},
    text = text.replace(new RegExp('#finCita#', 'g'), formatHour(getEndHour(cita))); // "Se reemplaza con la hora de finalización de la cita."},
    text = text.replace(new RegExp('#duracionCita#', 'g'), cita.Duracion.toString()); // "Se reemplaza por la duración de la cita en minutos"},

    text = text.replace(new RegExp('#cddddd#', 'g'), week[fecha.getDay()]); // "Se reemplaza por el nombre del día de la cita Ej: Martes, Miércoles, etc."},
    text = text.replace(new RegExp('#cdd#', 'g'), formatZero(+fecha.getDate())); // "Se reemplaza por el número del día de la cita"},
    text = text.replace(new RegExp('#cmmmmm#', 'g'), months[+fecha.getMonth()]); // "Se reemplaza por el nombre del mes de la cita Ej: Enero, Febrero, etc."},
    text = text.replace(new RegExp('#cmm#', 'g'), formatZero(+fecha.getMonth() + 1)); // "Se reemplaza por el número del mes de la cita"},
    text = text.replace(new RegExp('#caaaa#', 'g'), fecha.getFullYear().toString()); // "Se reemplaza por el año de la cita en formato de 4 dígitos. Ej: 2019"},
    text = text.replace(new RegExp('#caa#', 'g'), fecha.getFullYear().toString().slice(2)); // "Se reemplaza por el año de la cita en formato de 2 dígitos. Ej. 19"},

    text = text.replace(new RegExp('#nombreAgenda#', 'g'), agenda.Nombre); // "Se reemplaza por el nombre que tiene la agenda a la que pertenece esa cita."},
    // text = text.replace(new RegExp('#odontosys.net#', 'g'), ''); // "Se reemplaza por un link donde el paciente podrá confirmar o cancelar su cita."}

    return text;
}