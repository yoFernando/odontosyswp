import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAgenda } from "../agenda/hooks/useAgendas";
import URL from "./routes";

type IRootStackType = {
    [URL.agenda]: undefined,
    [URL.agenda_selected]: IAgenda
};

export type IAgendaParamStack = NativeStackScreenProps<IRootStackType, URL.agenda>
export type IAgendaSelectedParamStack = NativeStackScreenProps<IRootStackType, URL.agenda_selected>

export default IRootStackType