import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import {SingleNewState} from '../models/news/newsState';
import {getNewsById} from '../services/news/getSingleNews';

export default function Newspage({route, navigation}: any) {
  const {colors} = useTheme();
  const [news_item, set_news_item] = useState<SingleNewState>();
  const {news}: {news: SingleNewState} = route.params;

  useEffect(() => {
    if (news.id != null) {
      getNewsById(news.id!).then(res => {
        set_news_item(res);
      });
    }
  }, []);

  return (
    <View>
      {news_item != null && (
        <Card
          key={news_item.id}
          style={{backgroundColor: colors.secondary, margin: 10}}>
          <Card.Title
            titleNumberOfLines={2}
            titleStyle={{fontSize: 20, fontWeight: '600'}}
            title={news_item.title}
            subtitle={news_item.short_text}
            subtitleNumberOfLines={3}
            subtitleStyle={{fontSize: 14, fontWeight: '300'}}
          />
          <Card.Cover source={{uri: news_item.image_url}} />
          <Card.Content>
            <Text variant="titleLarge">Section: {news_item.model_name}</Text>
            <Text variant="bodyLarge"> {news_item.body}</Text>
            <Text style={{alignSelf: 'flex-end'}} variant="titleMedium">
              Published at:{'\n'}
              {new Date(news_item.created_at!).getDay().toString()}
              {'/'}
              {new Date(news_item.created_at!).getMonth().toString()}
              {'/'}
              {new Date(news_item.created_at!).getFullYear().toString()}{' '}
              {new Date(news_item.created_at!).getHours().toString()}
              {':'}
              {new Date(news_item.created_at!).getMinutes().toString()}
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
