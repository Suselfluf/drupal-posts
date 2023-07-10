export interface NewsState {
  news: Array<SingleNewState>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | true;
}

export interface SingleNewState {
  id: number | null;
  title: string | null;
  image_url: string | null;
  image_additional_url: string | null;
  body: string | null;
  short_text: string | null;
  created_at: Date | null;
  category: string | null;
  icon: string | null;
  model_name: string | null;
  table_name: string | null;
}
