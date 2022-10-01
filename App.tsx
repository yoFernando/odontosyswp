import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React from 'react';
import StackNavigationContainer from './src/navigation/container';
import PaperAppContainer from './src/paper/config';
import { SWRConfigContainer } from './src/swr/config';

function App() {
  return (
    <PaperAppContainer>
      <SWRConfigContainer>
        <ExpoStatusBar animated style="light" />
        <StackNavigationContainer />
      </SWRConfigContainer>
    </PaperAppContainer>
  );
}

export default App;