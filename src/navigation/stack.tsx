import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAgenda } from "../agenda/hooks/useAgendas";
import URL from "./routes";

export type IRootStackType = {
    [URL.agenda]: undefined,
    [URL.agenda_selected]: IAgenda,
    [URL.profile]: undefined
};

export type IProfileParamStack = NativeStackScreenProps<IRootStackType, URL.profile>
export type IAgendaParamStack = NativeStackScreenProps<IRootStackType, URL.agenda>
export type IAgendaSelectedParamStack = NativeStackScreenProps<IRootStackType, URL.agenda_selected>