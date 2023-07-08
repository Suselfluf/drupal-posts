// import axios from 'axios';
// import {useDispatch, useSelector} from 'react-redux';
// import {AuthHeaders} from '../../models/users/authHeaders';
// import {RootState} from '../../store/store';

// const auth_headers: AuthHeaders = useSelector(
//   (state: RootState) => state.authHeadersSlice,
// );

// const baseURL = 'https://lzone.secret-agents.ru/api/v2/';

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   // headers: {
//   //   'accept-token': auth_headers.acessToken,
//   //   client: auth_headers.client,
//   //   uid: auth_headers.uid,
//   // },
// });

// axios.interceptors.request.use(function (config) {
//   const token = auth_headers.acessToken;
//   const client = auth_headers.client;
//   const uid = auth_headers.uid;
//   config.headers['access-token'] = token;
//   config.headers.client = auth_headers.client;
//   config.headers.uid = auth_headers.uid;

//   return config;
// });

// // axiosInstance.interceptors.response.use(
// //   response => {
// //     return response;
// //   },
// //   async function (error) {
// //     const originalRequest = error.config;

// //     if (typeof error.response === 'undefined') {
// //       console.log(
// //         'A server/network error occurred. ' +
// //           'Looks like CORS might be the problem. ' +
// //           'Sorry about this - we will get it fixed shortly.',
// //       );
// //       return Promise.reject(error);
// //     }
// //     if (error.response.status === 403) {
// //       dispatch(logOut);
// //     }
// //     if (
// //       error.response.status === 401 &&
// //       originalRequest.url === baseURL + 'admin-auth/token/refresh/'
// //     ) {
// //       dispatch(logOut);
// //       return Promise.reject(error);
// //     }

// //     if (
// //       error.response.data.code === 'token_not_valid' &&
// //       error.response.status === 401 &&
// //       error.response.statusText === 'Unauthorized'
// //     ) {
// //       const refreshToken = localStorage.getItem('refresh_token');

// //       if (refreshToken) {
// //         const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
// //         // exp date in token is expressed in seconds, while now() returns milliseconds:
// //         const now = Math.ceil(Date.now() / 1000);
// //         // console.log(tokenParts.exp);

// //         if (tokenParts.exp > now) {
// //           return axiosInstance
// //             .post('admin-auth/token/refresh/', {refresh: refreshToken}) // Makes refresh token undefined!!
// //             .then(response => {
// //               localStorage.setItem('access_token', response.data.access);
// //               // localStorage.setItem("refresh_token", response.data.refresh);

// //               axiosInstance.defaults.headers['Authorization'] =
// //                 'JWT ' + response.data.access;
// //               originalRequest.headers['Authorization'] =
// //                 'JWT ' + response.data.access;

// //               return axiosInstance(originalRequest);
// //             })
// //             .catch(err => {
// //               console.log(err);
// //             });
// //         } else {
// //           console.log('Refresh token is expired', tokenParts.exp, now);
// //           dispatch(logOut);
// //           // window.location.href = "/login/";
// //         }
// //       } else {
// //         console.log('Refresh token not available.');
// //         dispatch(logOut);
// //         // window.location.href = "/login/";
// //       }
// //     }

// //     // specific error handling done elsewhere
// //     return Promise.reject(error);
// //   },
// // );

// export default axiosInstance;

// showLastCommitMessageForThisLibrary.js
import {create} from 'apisauce';
import {store} from '../../store/store';

// define the api
export const api = create({
  baseURL: 'https://lzone.secret-agents.ru/api/v2/',
  headers: {
    ['access-token']: store.getState().authHeadersSlice.acessToken,
    client: store.getState().authHeadersSlice.client,
    uid: store.getState().authHeadersSlice.uid,
  },
});

// export const api = create({
//   baseURL: 'https://lzone.secret-agents.ru/api/v2/',
//   headers: {
//     ['access-token']: 'PWuJQzHtBWyDwQ6pG-aQMA',
//     client: '2RnQdedez-XQiEEaV2RdyA',
//     uid: 'bullet2271293@gmail.com',
//   },
// });

// console.log(api);
// console.log(api2);

// start making calls
// api
//   .get('/repos/skellock/apisauce/commits')
//   .then(response => response.data[0].commit.message)
//   .then(console.log)

// // customizing headers per-request
// api.post('/users', { name: 'steve' }, { headers: { 'x-gigawatts': '1.21' } })
