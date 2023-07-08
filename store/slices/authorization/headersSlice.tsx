import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthHeaders} from '../../../models/users/authHeaders';

const initialState: AuthHeaders = {
  acessToken: null,
  client: null,
  uid: null,
};

export const authHeadersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeaders: (state, action: PayloadAction<AuthHeaders>) => {
      // state = action.payload;

      state.acessToken = action.payload.acessToken;
      state.client = action.payload.client;
      state.uid = action.payload.uid;
    },
    // removeUser: state => {
    //   state.email = null;
    //   state.token = null;
    //   state.id = null;
    //   state.is_logged_in = false;
    // },
  },
});

export const {setHeaders} = authHeadersSlice.actions;

export default authHeadersSlice.reducer;
