// import React from 'react';
import {Text, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {signIn} from '../services/auth/authorization';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {userState} from '../models/users/userInitState';
import {setUser} from '../store/slices/authorization/userSlice';
import {signInFormValues} from '../models/users/signInForm';
import {useEffect, useState} from 'react';

export default function Newspage({navigation}: any) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const user_data: userState = useSelector(
    (state: RootState) => state.userSlice,
  );

  const [is_loading, set_is_loading] = useState<boolean>(false);

  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<signInFormValues>({mode: 'onChange', shouldUnregister: true});

  const onSubmit: SubmitHandler<signInFormValues> = async (
    data: signInFormValues,
  ) => {
    set_is_loading(true);
    signIn(data, dispatch).then(res => {
      try {
        dispatch(setUser(res)); // For user_data access throughut the app
      } catch (err) {
      } finally {
        set_is_loading(false);
      }
      reset();
    });
  };

  const errorMessageStyle = {
    color: colors.error,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View>
          <Text style={{textAlign: 'center', marginBottom: 40, fontSize: 25}}>
            News App
          </Text>
        </View>
        <View
          style={{marginLeft: 60, marginRight: 60, display: 'flex', gap: 20}}>
          <View>
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <TextInput
                  mode="outlined"
                  style={{backgroundColor: colors.secondary}}
                  value={value}
                  label="Email"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  defaultValue="bullet2271293@gmail.com" // remove before submission
                />
              )}
              name="email"
            />
            <Text style={errorMessageStyle}>
              {errors.email && errors.email.message}
            </Text>
          </View>

          <View>
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
                  mode="outlined"
                  style={{backgroundColor: colors.secondary}}
                  label="Password"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                  placeholder="Password"></TextInput>
              )}
              name="password"
            />
            <Text style={errorMessageStyle}>
              {errors.password && errors.password.message}
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            disabled={errors.email || errors.password}
            style={{width: 120}}
            mode="outlined"
            onPress={handleSubmit(onSubmit)}>
            Sign In
          </Button>
        </View>
      </View>
      {is_loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: colors.backdrop,
          }}>
          <ActivityIndicator
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}
            animating={true}
            color={colors.primary}
            size={'large'}
          />
        </View>
      )}
    </>
  );
}
