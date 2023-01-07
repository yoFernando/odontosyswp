export interface IAgenda {
    Nombre: string,
    Visible: boolean,
    Color: number,
    idAgenda: number,
    idClinica: number
    DuracionCita: number,
    TicksUltimaSincronizacion: number,
    TicksUltimoCambioPush: number,
}
export interface ICita {
    "ColorDeFondo": number,
    "Concurrio": number,
    "Confirmada": number,
    "Duracion": number,
    "Hora": number,
    "Fecha": string,
    "InfoExtra": string,
    "Nota": string,
    "TicksFechaUpdated": number,
    "TipoDeCita": number
    "idAgenda": number
    "idCita": number
    "idClinica": number
    "idPaciente": number
    "paciente": null | {
        "idClinica": number,
        "idPaciente": number,
        "idEstadoPersonalizado": number,
        "MedioDeComunicacion": number,
        "nombre": string,
        "movilDeEnvio": string,
        "telefonoParaMostrar": string,
        "tieneAlertaPorCuestionario": boolean
    }
}