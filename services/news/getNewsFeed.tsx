import {NewsFeedResponse} from '../../models/responses/getNewsFeedResponse';
// import { GetAllCamerasResponse } from "../../models/responses/get_all_cameras_response";
import {api} from '../api/api';

export const getNewsFeed = async () => {
  let response = new Promise<NewsFeedResponse>((resolve, reject) => {
    api
      .get<NewsFeedResponse>('news')
      .then(res => {
        if (res.data?.errors) {
          reject(res.data.errors);
        }
        resolve(res.data);
      })
      .catch(reason => {
        reject(reason.response.data);
      });
  });
  return response;
};
