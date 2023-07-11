import {Provider} from 'react-redux';
import {store} from '../../store/store';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../../store/slices/authorization/userSlice';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

export default function renderWithRedux(renderedComponent) {
  const store = configureStore({
    reducer: {
      user: userSlice,
    },
  });

  return render(<Provider store={store}>{renderedComponent}</Provider>);
}
