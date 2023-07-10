import axios from 'axios';
import {signInFormValues} from '../../models/users/signInForm';

import {AppDispatch} from '../../store/store';
import {AuthResponse} from '../../models/responses/AuthResponse';
import {userState} from '../../models/users/userInitState';
import {setHeaders} from '../../store/slices/authorization/headersSlice';
import {useDispatch} from 'react-redux';
import {AuthHeaders} from '../../models/users/authHeaders';
import {logOut} from '../../store/slices/authorization/userSlice';
import {api} from '../api/api';
import {ApisauceInstance} from 'apisauce';

export const signIn = async (data: signInFormValues, dispatch: AppDispatch) => {
  let response = new Promise<userState>((resolve, reject) => {
    api
      .post<ApisauceInstance>(
        'https://lzone.secret-agents.ru/api/v2/auth/sign_in',
        data,
      )
      .then(res => {
        if (res.data?.user) {
          resolve(res.data);
          let {['access-token']: acessToken, client, uid} = res.headers;
          dispatch(setHeaders({acessToken, client, uid}));
        } else if (!res.data?.succes) {
          reject(res.data.errors);
        }
      });
  });
  return response;
};
