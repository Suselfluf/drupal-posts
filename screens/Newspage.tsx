import React, {useEffect, useState} from 'react';
import {Linking, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import {SingleNewState} from '../models/news/newsState';
import {getNewsById} from '../services/news/getSingleNews';

export default function Newspage({route, navigation}: any) {
  const {colors} = useTheme();
  const [news_item, set_news_item] = useState<SingleNewState>();
  const {news}: {news: SingleNewState} = route.params;
  const [link, set_link] = useState<string>('');

  const linkRx = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;

  useEffect(() => {
    if (news.id != null) {
      getNewsById(news.id!).then(res => {
        set_news_item(res);
      });
    }
  }, []);

  useEffect(() => {
    try {
      set_link(news_item?.body?.match(linkRx)[2]);
    } catch (error) {}

    return () => {};
  }, [news_item]);

  return (
    <View>
      {news_item != null && (
        <Card
          key={news_item.id}
          style={{backgroundColor: colors.secondary, margin: 10}}>
          <Card.Title
            titleNumberOfLines={2}
            titleStyle={{fontSize: 20, fontWeight: '600'}}
            title={news_item.title?.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
            subtitle={news_item.short_text?.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
            subtitleNumberOfLines={3}
            subtitleStyle={{fontSize: 14, fontWeight: '300'}}
          />
          <Card.Cover source={{uri: news_item.image_url}} />
          <Card.Content>
            <Text variant="titleLarge">
              Section: {news_item.model_name.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
            </Text>
            <Text variant="bodyLarge">
              {news_item.body.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
            </Text>
            <Text
              style={{color: colors.primary}}
              onPress={() => Linking.openURL(link)}>
              {link}
            </Text>
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
