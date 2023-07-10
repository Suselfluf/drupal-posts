import axios from 'axios';
import {NewsFeedResponse} from '../../models/responses/getNewsFeedResponse';
// import { GetAllCamerasResponse } from "../../models/responses/get_all_cameras_response";
import {api} from '../api/api';
import {SingleNewState} from '../../models/news/newsState';
import {ApisauceInstance} from 'apisauce';

export const getNewsById = async (id: number) => {
  let response = new Promise<SingleNewState>((resolve, reject) => {
    const x = api
      .get<ApisauceInstance>('news/' + id)
      .then(res => {
        if (res.data?.news) {
          resolve(res.data?.news);
        } else if (!res.data?.sucess) {
          reject(res.data.errors);
        }
      })
      .catch(reason => {
        reject(reason.response.data);
      });
  });
  return response;
};
