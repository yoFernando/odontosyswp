import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IAgenda } from "../agenda/types";
import URL from "./routes";

export type IRootStackType = {
    [URL.modules]: undefined,
    [URL.agenda]: undefined,
    [URL.agenda_selected]: IAgenda,
    [URL.profile]: undefined,
    [URL.birthday]: undefined,
    [URL.control]: undefined
};

export type IModulesParamStack = NativeStackScreenProps<IRootStackType, URL.modules>
export type IProfileParamStack = NativeStackScreenProps<IRootStackType, URL.profile>
export type IBirthdayParamStack = NativeStackScreenProps<IRootStackType, URL.birthday>
export type IAgendaParamStack = NativeStackScreenProps<IRootStackType, URL.agenda>
export type IControlParamStack = NativeStackScreenProps<IRootStackType, URL.control>
export type IAgendaSelectedParamStack = NativeStackScreenProps<IRootStackType, URL.agenda_selected>