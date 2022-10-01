import { RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import Appbar from "./appbar";
import styles from "../../../common/styles";
import useAgendas from "../../hooks/useAgendas";
import AgendaListItem from "./agendaList";

function AgendaContainer() {
  const { agendas, loading, onUpdate } = useAgendas();
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
                <AgendaListItem agenda={agenda} key={agenda.idAgenda} />
              )}
            </List.Section>
          )
        }
      </ScrollView>
    </Appbar>
  );
}

export default AgendaContainer;