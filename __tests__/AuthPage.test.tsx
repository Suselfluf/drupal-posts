import Authpage from '../screens/Authpage';
import {Provider} from 'react-redux';
import {store} from '../store/store';

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../store/slices/authorization/userSlice';
import renderWithRedux from '../helpers/testHelpers/renderWithRedux';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.useFakeTimers();

describe('Testing Auth page', () => {
  it('renders correcty', () => {
    renderWithRedux(<Authpage />);
  });

  it('Initially component does have 2 input forms and app title', () => {
    const {getByText} = renderWithRedux(<Authpage />);
    const NewsApp = getByText('News App');

    expect(NewsApp).not.toBeNull();
  });

  it('Renders page initially correctly', () => {
    const {getByText, getByPlaceholderText} = renderWithRedux(<Authpage />);
    const password = getByPlaceholderText('Password');
    const email = getByPlaceholderText('Email');
    const signInButton = getByText('Sign In');

    expect(password).not.toBeNull();
    expect(email).not.toBeNull();
    expect(signInButton).not.toBeNull();
  });

  it('Invalid format of password will call validation message', async () => {
    const {getByPlaceholderText, queryByText} = renderWithRedux(<Authpage />);

    const incorrecPassword = '1234567';

    await act(async () => {
      const password = getByPlaceholderText('Password');
      fireEvent.changeText(password, {target: {value: incorrecPassword}});
    });
    expect(queryByText('Minimal length is 8 symbols')).not.toBeNull();
  });

  it('Invalid prompt of email foramt will call validation message', async () => {
    const {getByPlaceholderText, queryByText} = renderWithRedux(<Authpage />);

    const incorrectEmail = 'anyMail@.dsa';

    await act(async () => {
      const email = getByPlaceholderText('Email');
      fireEvent.changeText(email, {target: {value: incorrectEmail}});
    });
    expect(queryByText('Format is incorrect')).not.toBeNull();
  });

  it('Empty email form submission will call validation message', async () => {
    const {getByPlaceholderText, queryByText, getByText, queryByTestId} =
      renderWithRedux(<Authpage />);

    const emplyLine = '';
    const signInButton = getByText('Sign In');
    const signInButton2 = queryByTestId('button');

    await act(async () => {
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');
      fireEvent.changeText(email, {target: {value: emplyLine}});
      fireEvent.changeText(password, {target: {value: emplyLine}});
      fireEvent.press(signInButton);
    });
    expect(queryByText('Email is required')).not.toBeNull();
    expect(queryByText('Password is required')).not.toBeNull();
    expect(signInButton2?.props.accessibilityState).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('Correct forms formation will allow to submit form', async () => {
    const {getByPlaceholderText, queryByText, getByText, queryByTestId} =
      renderWithRedux(<Authpage />);
    const correctEmail = 'bullet2271293@gmail.com';
    const correctPassword = 'beta1234';
    const signInButton = getByText('Sign In');
    const signInButton2 = queryByTestId('button');

    await act(async () => {
      const email = getByPlaceholderText('Email');
      const password = getByPlaceholderText('Password');
      fireEvent.changeText(email, {target: {value: correctEmail}});
      fireEvent.changeText(password, {target: {value: correctPassword}});
      fireEvent.press(signInButton);
    });
    expect(queryByText('Email is required')).toBeNull();
    expect(queryByText('Password is required')).toBeNull();
    expect(signInButton2?.props.accessibilityState).toHaveProperty(
      'disabled',
      false,
    );
    screen.debug();
  });
});
