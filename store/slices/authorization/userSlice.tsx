import {createSlice} from '@reduxjs/toolkit';
import {userState} from '../../../models/users/userInitState';
import {PayloadAction} from '@reduxjs/toolkit';

const initialState: userState = {
  user: {
    avatar_cropped_big_url: null,
    avatar_original_url: null,
    avatar_url: null,
    can_evacuation: null,
    card_loyalty_barcode_data: null,
    card_loyalty_exist: null,
    cinemas: [],
    email: null,
    game_character_id: null,
    grade_sheet_pdf_url: null,
    id: null,
    phone_city: null,
    phone_city_ext: null,
    phone_mobile: null,
    points_total: null,
    position: null,
    registered: null,
    roles: null,
    unit_head: null,
    unit_name: null,
    user_incoming_likes_count: null,
    user_like_status: {
      name: null,
      number: null,
      range: null,
      range_human: null,
      description: null,
    },
    user_unit: null,
    user_week_incoming_likes_count: null,
    username: null,
    vacation_days: null,
  },
  is_logged_in: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      state.user = action.payload.user;
      state.is_logged_in = true;
    },
    logOut: state => {
      state.is_logged_in = false;
      state.user = {
        avatar_cropped_big_url: null,
        avatar_original_url: null,
        avatar_url: null,
        can_evacuation: null,
        card_loyalty_barcode_data: null,
        card_loyalty_exist: null,
        cinemas: [],
        email: null,
        game_character_id: null,
        grade_sheet_pdf_url: null,
        id: null,
        phone_city: null,
        phone_city_ext: null,
        phone_mobile: null,
        points_total: null,
        position: null,
        registered: null,
        roles: null,
        unit_head: null,
        unit_name: null,
        user_incoming_likes_count: null,
        user_like_status: {
          name: null,
          number: null,
          range: null,
          range_human: null,
          description: null,
        },
        user_unit: null,
        user_week_incoming_likes_count: null,
        username: null,
        vacation_days: null,
      };
    },
  },
});

export const {setUser, logOut} = userSlice.actions;

export default userSlice.reducer;
