import {user_like_status} from './userLikestatus';

export interface userState {
  user: {
    avatar_cropped_big_url: string | null;
    avatar_original_url: string | null;
    avatar_url: string | null;
    can_evacuation: boolean | null;
    card_loyalty_barcode_data: string | null;
    card_loyalty_exist: boolean | null;
    cinemas: [];
    email: string | null;
    game_character_id: null;
    grade_sheet_pdf_url: string | null;
    id: number | null;
    phone_city: string | null;
    phone_city_ext: string | null;
    phone_mobile: string | null;
    points_total: number | null;
    position: string | null;
    registered: boolean | null;
    roles: Array<string> | null;
    unit_head: boolean | null;
    unit_name: string | null;
    user_incoming_likes_count: number | null;
    user_like_status: user_like_status;
    user_unit: null;
    user_week_incoming_likes_count: number | null;
    username: string | null;
    vacation_days: number | null;
  };
  is_logged_in: boolean | null;
}
