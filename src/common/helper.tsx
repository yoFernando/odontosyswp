import { ICita } from "../agenda/hooks/useCitas";
import { IUser } from "../auth/hooks/context";
import Logo from '../assets/fallback.jpeg';
import { ImageSourcePropType } from "react-native";

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const monthsShort = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.']
export const week = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
export const years = [2023, 2022, 2021];
export const weekShort = ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'];

export function getTrimedDate(date: string) {
    return new Date(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10));
}
export function getTrimedHour(hour: number) {
    return (hour < 1000 ? '0' + hour : '' + hour).split("")
}

export const formatAvatar = (user: IUser): ImageSourcePropType => {
    if (!user.fotoDePerfil) {
        return Logo
    }
    return {uri:`http://proxy.odontosys.com/api/odontosys-resized.s3.us-east-2.amazonaws.com/${(""+user.idClinica).padStart(5, '0')}/fotoperfil.png`}
}

export enum IFormat {
    'BIRTHDAY',
    'DAY/MONTH',
    'YY/MM/DD',
    'DD/MM/YY',
}

const formatter = {
    [IFormat["BIRTHDAY"]]: (date: Date) => {
        const time = new Date();
        time.setDate(date.getDate())
        return `${week[date.getDay()]} ${+formatZero(time.getDate())}`
    },
    [IFormat["DAY/MONTH"]]: (date: Date) => `${weekShort[date.getDay()]} ${formatZero(date.getDate())} de ${months[date.getMonth()]}`,
    [IFormat['YY/MM/DD']]: (date: Date) => `${formatZero(date.getFullYear())}/${formatZero(+date.getMonth() + 1)}/${formatZero(date.getDate())}`,
    [IFormat['DD/MM/YY']]: (date: Date) => `${formatZero(date.getDate())}/${formatZero(+date.getMonth() + 1)}/${formatZero(date.getFullYear())}`,
}

export const formatZero = (n: number): string => n <= 9 ? '0' + n : "" + n

export const format = (datetime: string | Date, format: IFormat): string => {
    return formatter[format](typeof datetime === "string" ? getTrimedDate(datetime) : datetime);
}

function getHoursAndMinutes(hour: number) {
    const time = getTrimedHour(hour);
    let hours = parseInt(`${time[0]}${time[1]}`);
    let minutes = parseInt(`${time[2]}${time[3]}`);
    while (minutes >= 60) {
        hours++;
        minutes -= 60;
    }
    return { hours, minutes };
}

export const getEndHour = (cita: ICita) => {
    const { hours, minutes } = getHoursAndMinutes(cita.Hora)

    const fecha = getTrimedDate(cita.Fecha);
    const date = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hours, minutes, 0)

    date.setMinutes(date.getMinutes() + cita.Duracion)

    return parseInt(`${formatZero(date.getHours())}${formatZero(date.getMinutes())}`)
}

export const formatHour = (hour: number, cutted: boolean = false) => {
    let time = getTrimedHour(hour)
    const hours = `${time[0]}${time[1]}`;
    return `${hours}:${time[2]}${time[3]}${cutted ? '' : parseInt(hours) > 11 ? 'pm' : 'am'}`
}

export const getNextBirth = (date: Date | string): number => {
    const birthDate = typeof date === "string" ? getTrimedDate(date) : date;
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export enum areaCodes {
    us = 1,
    do = 1,
    uy = 598,
    mx = 52,
    cr = 506,
    pe = 51,
    ec = 593,
    ar = 54,
    ven = 58
}

export const getPhone = (phoneStr: string, pais: areaCodes = areaCodes.uy) => {
    const movil = ((pais === areaCodes.uy) ? phoneStr.slice(1) : phoneStr).replace(new RegExp(' ', 'g'), '').replace('+', '').trim()
    const repeated = movil.indexOf(pais.toString())
    if (repeated === 0 || repeated === 1) {
        return `+${pais}${movil.replace(pais.toString(), '')}`
    }
    return `+${pais}${movil}`;
}