import {create} from 'apisauce';
import {store} from '../../store/store';

export const api = create({
  baseURL: 'https://lzone.secret-agents.ru/api/v2/',
  headers: {
    ['access-token']: store.getState().authHeadersSlice.acessToken,
    client: store.getState().authHeadersSlice.client,
    uid: store.getState().authHeadersSlice.uid,
  },
});
