// import {it} from '@jest/globals';
// import * as React from 'react';
// import {Provider} from 'react-redux';
// import {
//   render,
//   screen,
//   fireEvent,
//   waitFor,
// } from '@testing-library/react-native';
// import {store} from '../store/store';
// import Authpage from '../screens/Authpage';
// import {debug} from 'console';

// it('Auth page layout test', async () => {
//   const component = (
//     <Provider store={store}>
//       <Authpage />
//     </Provider>
//   );

//   render(component);
//   debug;
//   const header = screen.findByText('News App');
//   // let button = screen.getByText('Sign In');
//   // let buttonEle = screen.getByRole('Button', {});
//   const text = screen.findByRole('Text', {name: 'Email'});

//   //assert
//   screen.debug();
//   expect(text).toBeInTheDocument();

//   // screen.getByText('Sign In', {}).toBeInTheDocument();
//   // expect(input).toBeOnTheScreen();

//   // const textToEnter = 'This is a random element';
//   // fireEvent.changeText(input, textToEnter);
//   // fireEvent.press(screen.getByText('Submit form'));

//   // const todosState = store.getState().todos;

//   // expect(todosState.length).toEqual(1);

//   // expect(todosState).toEqual(
//   //   expect.arrayContaining([
//   //     expect.objectContaining({
//   //       id: 1,
//   //       text: textToEnter,
//   //       date: expect.any(Date),
//   //     }),
//   //   ]),
//   // );
// });
