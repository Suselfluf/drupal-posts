import React from 'react';
import {View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NewsState, SingleNewState} from '../../models/news/newsState';
import {RootState} from '../../store/store';
import {Avatar, Button, Card, Text} from 'react-native-paper';

export default function NewsFeedCard({navigation}: any) {
  const dispatch = useDispatch();
  const newsFeed: NewsState = useSelector(
    (state: RootState) => state.newsFeedSlice,
  );

  const handleMorePress = () => {
    // navigation.navigate('Newspage', { // navigate from the parent component
    //   itemId: 86,
    //   otherParam: 'anything you want here',
    // });
  };

  return (
    <>
      <View>
        {newsFeed.news.map((news: SingleNewState) => (
          <>
            <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" />
              <Card.Content>
                <Text variant="titleLarge">{news.title}</Text>
                <Text variant="bodyMedium">{news.body}</Text>
              </Card.Content>
              <Card.Cover source={{uri: news.image_url}} />
              <Card.Actions>
                <Button onPress={handleMorePress}>More</Button>
              </Card.Actions>
            </Card>
          </>
        ))}
      </View>
    </>
  );
}
