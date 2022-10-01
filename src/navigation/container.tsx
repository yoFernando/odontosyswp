import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Route Container
import AgendaContainer from '../agenda/whatsapp/container';

// URL Stack
import { URL, IRootStackType } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Stack = createNativeStackNavigator<IRootStackType>();
const defaultOptions = { headerShown: false }

function StackNavigationContainer() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={URL.agenda}>
          <Stack.Screen name={URL.agenda} component={AgendaContainer} options={defaultOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default StackNavigationContainer;