import { Text, View } from "react-native";
import useAgendas from "../../hooks/useAgendas";

function AgendaContainer() {
  const agendas = useAgendas();
  return (
    <View>
      {
        agendas.length ? agendas.map(agenda => (
          <View key={agenda.name}>
            <Text>{agenda.name}</Text>
          </View>
        )) : (
          <View>
            <Text>Cargando agendas</Text>
          </View>
        )
      }
    </View>
  );
}

export default AgendaContainer;