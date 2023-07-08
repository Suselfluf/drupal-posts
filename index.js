// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './App';

// export default function Main() {
//   return (

//   );
// }

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
};

AppRegistry.registerComponent(appName, () => () => (
  <React.StrictMode>
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  </React.StrictMode>
));
