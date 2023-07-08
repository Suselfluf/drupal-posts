import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

export default function Newspage({navigation}: any) {
  const [first, setfirst] = useState(null);

  return (
    <View>
      <Text>Newspage</Text>
      <Button title="Go back" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
