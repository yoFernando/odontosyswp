import { useEffect, useState } from "react";
import { getAgendas } from "../store/actions";

interface IAgenda {
    name: string
}

export default function useAgendas() {
    const [agendas, setAgendas] = useState<IAgenda[]>([]);

    useEffect(() => {
        getAgendas(5).then(setAgendas)
    }, [])

    return agendas;
};
