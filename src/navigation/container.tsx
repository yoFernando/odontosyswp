import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Route Container
import AgendaContainer from '../agenda/whatsapp/container/';
import CitasContainer from '../agenda/whatsapp/citas/';
import LoginContainer from '../auth/container/';
import ProfileContainer from '../profile/container/';
import ModulesContainer from '../modules/container/';
import BirthdayContainer from '../birthday/container/';
import ControlContainer from '../control/container/';

// URL Stack
import { URL, IRootStackType } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AuthContext } from '../auth/hooks/context';

export const Stack = createStackNavigator<IRootStackType>();
const defaultOptions = { headerShown: false }

function StackAuthNavigationContainer() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <LoginContainer />
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} initialRouteName={URL.control}>
          <Stack.Screen name={URL.modules} component={ModulesContainer} options={defaultOptions} />
          <Stack.Screen name={URL.birthday} component={BirthdayContainer} options={defaultOptions} />
          <Stack.Screen name={URL.control} component={ControlContainer} options={defaultOptions} />
          <Stack.Screen name={URL.agenda} component={AgendaContainer} options={defaultOptions} />
          <Stack.Screen name={URL.agenda_selected} component={CitasContainer} options={defaultOptions} />
          <Stack.Screen name={URL.profile} component={ProfileContainer} options={defaultOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default StackAuthNavigationContainer;