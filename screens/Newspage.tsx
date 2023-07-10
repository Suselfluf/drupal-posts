import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Avatar, Button, Card, Text, useTheme} from 'react-native-paper';
import {SingleNewState} from '../models/news/newsState';

export default function Newspage({route, navigation}: any) {
  const {colors} = useTheme();
  const {news}: {news: SingleNewState} = route.params;

  return (
    <View>
      <Card
        key={news.id}
        style={{backgroundColor: colors.secondary, margin: 10}}>
        <Card.Title
          titleNumberOfLines={2}
          titleStyle={{fontSize: 20, fontWeight: '600'}}
          title={news.title}
          subtitle={news.short_text}
          subtitleNumberOfLines={3}
          subtitleStyle={{fontSize: 14, fontWeight: '300'}}
        />
        <Card.Cover source={{uri: news.image_url}} />
        <Card.Content>
          <Text variant="titleLarge">Section: {news.model_name}</Text>
          <Text variant="bodyLarge"> {news.body}</Text>
          <Text style={{alignSelf: 'flex-end'}} variant="titleMedium">
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
      </Card>
      {/* <Button onPress={() => navigation.navigate('Home')}>Go back</Button> */}
    </View>
  );
}
