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

export default function Homepage({navigation}: any) {
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
      <ScrollView>
        <View>
          {newsFeedState.error && <Text>Error has occured</Text>}
          {newsFeedState.loading === 'pending' && (
            <View>
              <Text>Pending...</Text>
            </View>
          )}
          {newsFeedState.loading === 'succeeded' && (
            <View>
              <NewsFeed />
            </View>
          )}
          <Text>Home page</Text>
          <Button
            title="ss"
            onPress={() => {
              navigation.navigate('Newspage', {
                itemId: 86,
                otherParam: 'anything you want here',
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
