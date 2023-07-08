// import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {signIn} from '../services/auth/authorization';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {userState} from '../models/users/userInitState';
import {setUser} from '../store/slices/authorization/userSlice';
import {signInFormValues} from '../models/users/signInForm';
import {useEffect} from 'react';

export default function Newspage({navigation}: any) {
  const dispatch = useDispatch();
  const user_data: userState = useSelector(
    (state: RootState) => state.userSlice,
  );

  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<signInFormValues>({mode: 'onChange', shouldUnregister: true});

  const onSubmit: SubmitHandler<signInFormValues> = async (
    data: signInFormValues,
  ) => {
    console.log(data);
    signIn(data, dispatch).then(res => {
      try {
        dispatch(setUser(res)); // For user_data access throughut the app
      } catch (err) {
        console.log(err);
      }
      reset();
    });
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            value={value}
            label="Email"
            onChangeText={value => onChange(value)}
            onBlur={onBlur}
            defaultValue="bullet2271293@gmail.com" // remove before submission
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Minimal length is 8 symbols',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Password"
            onChangeText={value => onChange(value)}
            onBlur={onBlur}
            value={value}
            secureTextEntry
            placeholder="Password"></TextInput>
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      <View>
        <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
          Sign In
        </Button>
        <Button onPress={() => console.log(user_data)}>Cl</Button>
      </View>
    </View>
  );
}
