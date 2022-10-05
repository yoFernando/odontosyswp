import { RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import Appbar from "./appbar";
import styles from "../../../common/styles";
import useAgendas, { IAgenda } from "../../hooks/useAgendas";
import AgendaListItem from "./agendaList";
import { IAgendaParamStack, URL } from "../../../navigation";

function AgendaContainer({ navigation }: IAgendaParamStack) {
  const { agendas, loading, onUpdate } = useAgendas();
  const onSelectAgenda = (agenda: IAgenda) => navigation.push(URL.agenda_selected, agenda);
  return (
    <Appbar title="Agendas">
      <ScrollView
        contentContainerStyle={styles.grow}
        refreshControl={<RefreshControl refreshing={agendas && loading} onRefresh={onUpdate} />}
      >
        {
          (loading) ? (
            <View style={[styles.grow, styles.center]}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <List.Section>
              {agendas.map(agenda =>
                <AgendaListItem agenda={agenda} key={agenda.idAgenda} onSelect={onSelectAgenda} />
              )}
            </List.Section>
          )
        }
      </ScrollView>
    </Appbar>
  );
}

export default AgendaContainer;