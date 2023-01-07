import { useState } from 'react';
import AxiosClient from '../../swr/axios';
import { assign } from '../../swr/api';

interface IPlantilla {
    plantilla?: string
}
interface IPlantillaCache {
    [key: number]: string
}

export default function usePlantillaWhatsapp(idPlantilla: number) {
    const [data, setData] = useState<IPlantillaCache>({})
    const [loading, setLoading] = useState(false);

    async function get(idPaciente: number) {
        if (data[idPaciente]) {
            return data[idPaciente];
        }

        setLoading(true)
        const uri = assign(`/plantillas/ws/$id`, ['$id'], [idPlantilla.toString()])
        const response = await AxiosClient.get<IPlantilla>(uri, { params: { idPaciente } })
        setLoading(false)

        if (!response.data.plantilla) {
            throw new Error('Es necesario configurar la plantilla.')
        }

        setData({ ...data, [idPaciente]: response.data.plantilla })
        return response.data.plantilla
    }

    return {
        loading,
        get
    }
}