/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authpage from './screens/Authpage';
import Homepage from './screens/Homepage';
import Newspage from './screens/Newspage';
import {useDispatch, useSelector} from 'react-redux';
import {userState} from './models/users/userInitState';
import {RootState} from './store/store';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const user_data: userState = useSelector(
    (state: RootState) => state.userSlice,
  );

  useEffect(() => {}, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authentication">
          {user_data.is_logged_in ? (
            <>
              <Stack.Screen name="Home" component={Homepage} />
              <Stack.Screen name="Newspage" component={Newspage} />
              {/* <Stack.Screen name="Newspage" options={{title: 'Newspage'}}>
                {props => <Newspage {...props} extraData={'someData'} />}
              </Stack.Screen> */}
            </>
          ) : (
            <>
              <Stack.Screen name="Authentication" component={Authpage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
