import {create} from 'apisauce';
import {store} from '../../store/store';

export const api = create({
  baseURL: 'https://lzone.secret-agents.ru/api/v2/',
});
