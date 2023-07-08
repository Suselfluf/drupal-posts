import axios from 'axios';
import {NewsFeedResponse} from '../../models/responses/getNewsFeedResponse';
// import { GetAllCamerasResponse } from "../../models/responses/get_all_cameras_response";
import {api} from '../api/api';

export const getNewsFeed = async () => {
  let response = new Promise<NewsFeedResponse>((resolve, reject) => {
    const x = api
      .get<NewsFeedResponse>('news')
      .then(res => {
        resolve(res.data);
      })
      .catch(reason => {
        reject(reason.response.data);
      });
    console.log(x);
  });
  return response;
};
