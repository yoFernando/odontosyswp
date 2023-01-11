import React from 'react';
import 'react-native-gesture-handler';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import AuthContextContainer from './src/auth/hooks/context';
import DatesContextContainer from './src/agenda/hooks/useDateContext';
import StackNavigationContainer from './src/navigation/container';
import PaperAppContainer, { Theme } from './src/paper/config';
import { SWRConfigContainer } from './src/swr/config';
import MonedasContextContainer from './src/monedas/hooks/context';

function App() {
  return (
    <PaperAppContainer>
      <AuthContextContainer>
        <SWRConfigContainer>
          <ExpoStatusBar animated style="light" backgroundColor={Theme.colors.primary} />
          <MonedasContextContainer>
            <DatesContextContainer>
              <StackNavigationContainer />
            </DatesContextContainer>
          </MonedasContextContainer>
        </SWRConfigContainer>
      </AuthContextContainer>
    </PaperAppContainer>
  );
}

export default App;