export function getAgendas(idClinica: number){
    return new Promise((resolve) => {
        resolve([{name:"Agenda 1"},{name:"Agenda 2"}])
    })
}