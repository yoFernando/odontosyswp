import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Route Container
import AgendaContainer from '../agenda/whatsapp/container';

// URL Stack
import { URL, IRootStackType } from './index';

export const Stack = createNativeStackNavigator<IRootStackType>();

function StackNavigationContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={URL.agenda}>
        <Stack.Screen name={URL.agenda} component={AgendaContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigationContainer;