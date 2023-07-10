import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {NewsState} from '../../../models/news/newsState';
import {getNewsFeed} from '../../../services/news/getNewsFeed';
import {NewsFeedResponse} from '../../../models/responses/getNewsFeedResponse';

const initialState: NewsState = {
  news: [],
  loading: 'idle',
  error: null,
};

export const getNews = createAsyncThunk('newsFeed/getNewsFeed', async () => {
  const response = await getNewsFeed();
  return response;
});

export const newsFeedSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsFeed: (state, action: PayloadAction<NewsState>) => {
      state.news = action.payload.news;
    },
  },
  extraReducers: builder => {
    builder.addCase(getNews.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(getNews.rejected, state => {
      state.loading = 'failed';
    });
    builder.addCase(
      getNews.fulfilled,
      (state, action: PayloadAction<NewsFeedResponse>) => {
        state.loading = 'succeeded';
        state.news = action.payload.news;
        //   state.cameras = action.payload?.cameras;
      },
    );
  },
});

export const {setNewsFeed} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
