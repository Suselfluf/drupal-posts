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
import {useDispatch} from 'react-redux';
import {setUser} from '../store/slices/authorization/userSlice';
import {signInFormValues} from '../models/users/signInForm';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Newspage({navigation}: any) {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [is_error, set_Is_error] = useState<boolean>(false);
  const [server_error, set_server_error] = useState<string>('second');

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

    signIn(data, dispatch)
      .then(res => {
        dispatch(setUser(res)); // For user_data access throughut the app
      })
      .catch(errors => {
        set_server_error(errors[0]);
        set_Is_error(true);
      })
      .finally(() => {
        set_is_loading(false);
        reset();
      });
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        set_Is_error(false);
      }, 5000);
    };
  }, [is_error]);

  const getValue = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email !== null) {
        // value previously stored
        signIn({email: email, password: password}, dispatch)
          .then(res => {
            dispatch(setUser(res)); // For user_data access throughut the app
          })
          .catch(errors => {
            set_server_error(errors[0]);
            set_Is_error(true);
          })
          .finally(() => {
            set_is_loading(false);
            reset();
          });
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    getValue();
  }, []);

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
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Format is incorrect',
                },
              }}
              render={({field: {value, onChange, onBlur}}) => (
                <TextInput
                  mode="outlined"
                  style={{backgroundColor: colors.secondary}}
                  value={value}
                  // label="Email"
                  placeholder="Email"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                />
              )}
              name="email"
            />
            <Text testID="errorEmailMessage" style={errorMessageStyle}>
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
                  placeholder="Password"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry></TextInput>
              )}
              name="password"
            />
            <Text testID="errorPasswordMessage" style={errorMessageStyle}>
              {errors.password && errors.password.message}
            </Text>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Button
            disabled={!!errors.email || !!errors.password}
            style={{width: 120}}
            mode="outlined"
            onPress={handleSubmit(onSubmit)}>
            Sign In
          </Button>
          {is_error && (
            <View>
              <Text style={errorMessageStyle}>{server_error}</Text>
            </View>
          )}
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
