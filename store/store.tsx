import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/authorization/userSlice';
import authHeadersSlice from './slices/authorization/headersSlice';
import newsFeedSlice from './slices/news/newsSlice';

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    authHeadersSlice: authHeadersSlice,
    newsFeedSlice: newsFeedSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
