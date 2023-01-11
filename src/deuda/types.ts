import { IMoneda } from "../monedas/types"

export interface IDeuda {
    Deuda: number // 200
    Fecha: string // "2022-08-17"
    Nombre: string // "Juan perez"
    Nota: string // ""
    Total: number // 200
    correo: string // ""
    idPaciente: number // 692201
    movilDeEnvio: string // ""
    tickEmail: number // 0
    tickPhone: number // 0
    tickWhatsApp: number // 0
}
export interface IFilters {
    range: number,
    moneda: IMoneda
}