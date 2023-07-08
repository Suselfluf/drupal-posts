import axios from 'axios';
import {signInFormValues} from '../../models/users/signInForm';

import {AppDispatch} from '../../store/store';
import {AuthResponse} from '../../models/responses/AuthResponse';
import {userState} from '../../models/users/userInitState';
import {setHeaders} from '../../store/slices/authorization/headersSlice';
import {useDispatch} from 'react-redux';
import {AuthHeaders} from '../../models/users/authHeaders';
import {logOut} from '../../store/slices/authorization/userSlice';

export const signIn = async (data: signInFormValues, dispatch: AppDispatch) => {
  let response = new Promise<userState>((resolve, reject) => {
    axios
      .post<userState>(
        'https://lzone.secret-agents.ru/api/v2/auth/sign_in',
        data,
      )
      .then(res => {
        resolve(res.data);
        let {['access-token']: acessToken, client, uid} = res.headers;
        dispatch(setHeaders({acessToken, client, uid}));
      })
      .catch(reason => {
        reject(reason.response.data);
      });
  });
  return response;
};

export const signOut = async (dispatch: AppDispatch) => {
  new Promise<void>((resolve, reject) => {
    dispatch(setHeaders({acessToken: null, client: null, uid: null}));
  }).then(() => {
    dispatch(logOut);
    console.log('signed out');
  });
  // localStorage.setItem("is_logged_in", "false");
  // await dispatch(removeUser());
  // setTimeout(() => route("/home"));
};
