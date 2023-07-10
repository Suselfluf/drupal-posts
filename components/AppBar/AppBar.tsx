import {Appbar, Props} from 'react-native-paper';
import React from 'react';
import {userState} from '../../models/users/userInitState';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Avatar} from 'react-native-paper';
import {logOut} from '../../store/slices/authorization/userSlice';

export default function AppBar() {
  const user_data: userState = useSelector(
    (state: RootState) => state.userSlice,
  );
  const dispatch = useDispatch();

  const handleLogOutPress = () => {
    // signOut(dispatch);
    dispatch(logOut());
  };

  return (
    <Appbar.Header style={{marginTop: 0}}>
      <Appbar.Content
        titleStyle={{fontSize: 18, alignSelf: 'flex-start'}}
        title={'Hello, ' + user_data.user.username}
      />
      <Avatar.Image
        size={24}
        source={{uri: user_data.user.avatar_original_url}}
      />
      <Appbar.Action
        icon="logout"
        onPress={() => {
          handleLogOutPress();
        }}
      />
    </Appbar.Header>
  );
}
