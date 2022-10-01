import { NativeStackScreenProps } from "@react-navigation/native-stack";
import URL from "./routes";

type IRootStackType = {
    [URL.agenda]: undefined
};

export type IAgendaParamStack = NativeStackScreenProps<IRootStackType, URL.agenda>

export default IRootStackType