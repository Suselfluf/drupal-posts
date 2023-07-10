import React from 'react';
import {View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NewsState, SingleNewState} from '../../models/news/newsState';
import {RootState} from '../../store/store';
import {Avatar, Button, Card, Text, useTheme} from 'react-native-paper';

export default function NewsFeedCard({navigation, news}: any) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const newsFeed: NewsState = useSelector(
    (state: RootState) => state.newsFeedSlice,
  );

  const handleMorePress = (news: SingleNewState) => {
    navigation.navigate('Newspage', {
      // navigate from the parent component
      news: news,
      title: news.title,
    });
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          gap: 20,
          margin: 10,
        }}>
        {newsFeed.news.map((news: SingleNewState) => (
          <Card key={news.id} style={{backgroundColor: colors.secondary}}>
            <Card.Title
              titleStyle={{fontSize: 20, fontWeight: '600'}}
              title={news.title}
              subtitle={news.short_text}
              subtitleStyle={{fontSize: 14, fontWeight: '300'}}
            />
            <Card.Cover source={{uri: news.image_url}} />
            <Card.Content>
              <Text variant="titleMedium">
                Published at:{'\n'}
                {new Date(news.created_at!).getDay().toString()}
                {'/'}
                {new Date(news.created_at!).getMonth().toString()}
                {'/'}
                {new Date(news.created_at!).getFullYear().toString()}{' '}
                {new Date(news.created_at!).getHours().toString()}
                {':'}
                {new Date(news.created_at!).getMinutes().toString()}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                style={{backgroundColor: colors.background}}
                onPress={() => handleMorePress(news)}>
                Read More
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </>
  );
}
