import { Alert, BackHandler, RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import Appbar from "./appbar";
import styles from "../../../common/styles";
import useAgendas, { IAgenda } from "../../hooks/useAgendas";
import Agenda from "./item";
import { IAgendaParamStack, URL } from "../../../navigation";

function AgendaContainer({ navigation }: IAgendaParamStack) {
  const { agendas, loading, onUpdate } = useAgendas();
  const onSelectAgenda = (agenda: IAgenda) => navigation.push(URL.agenda_selected, agenda);
  const onPressProfile = () => navigation.navigate(URL.profile)
  const onPressBack = () => {
    Alert.alert(
      'Salir',
      '¿Está seguro de que desea salir?',
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => BackHandler.exitApp()
        }
      ]
    )
  }

  return (
    <Appbar title="Agendas" onPressBack={onPressBack} onPressProfile={onPressProfile}>
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
                <Agenda agenda={agenda} key={agenda.idAgenda} onSelect={onSelectAgenda} />
              )}
            </List.Section>
          )
        }
      </ScrollView>
    </Appbar>
  );
}

export default AgendaContainer;