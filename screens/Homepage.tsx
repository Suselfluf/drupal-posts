import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NewsState} from '../models/news/newsState';
import {RootState} from '../store/store';
import {getNews} from '../store/slices/news/newsSlice';
import NewsFeed from '../components/NewsFeed/NewsFeed';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import AppBar from '../components/AppBar/AppBar';
export default function Homepage({navigation, props}: any) {
  const dispatch = useDispatch();
  const newsFeedState: NewsState = useSelector(
    (state: RootState) => state.newsFeedSlice,
  );

  const loadNewsFeed = () => {
    dispatch(getNews());
  };

  useEffect(() => {
    loadNewsFeed();
  }, []);

  return (
    <SafeAreaView>
      {/* <AppBar /> */}
      <ScrollView>
        <View>
          {newsFeedState.error && <Text>Error has occured</Text>}
          {newsFeedState.loading === 'pending' && (
            <View style={{marginTop: 50}}>
              <ActivityIndicator color={MD2Colors.red800} />
            </View>
          )}
          {newsFeedState.loading === 'succeeded' && (
            <View>
              <NewsFeed navigation={navigation} />
            </View>
          )}
          {newsFeedState.loading === 'failed' && (
            <View>
              <Text>Failed</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
