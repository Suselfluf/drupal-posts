import axios from 'axios';
import {signInFormValues} from '../../models/users/signInForm';

import {AppDispatch} from '../../store/store';

import {userState} from '../../models/users/userInitState';
import {setHeaders} from '../../store/slices/authorization/headersSlice';

import {api} from '../api/api';
import {ApisauceInstance} from 'apisauce';

export const signIn = async (data: signInFormValues, dispatch: AppDispatch) => {
  let response = new Promise<userState>((resolve, reject) => {
    api.post<ApisauceInstance>('auth/sign_in', data).then(res => {
      if (res.data?.user) {
        let {['access-token']: acessToken, client, uid} = res.headers;
        dispatch(setHeaders({acessToken, client, uid}));
        api.setHeader('access-token', acessToken);
        api.setHeader('client', client);
        api.setHeader('uid', uid);
        resolve(res.data);
      } else if (!res.data?.succes) {
        reject(res.data.errors);
      }
    });
  });
  return response;
};
