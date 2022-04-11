import * as React from 'react';
import renderer from 'react-test-renderer';

import FormError from './FormError';
import { NativeBaseProvider } from 'native-base';
// 
it(`form error renders error correctly`, () => {
  const tree = renderer.create(<NativeBaseProvider><FormError error='Incorrect password'></FormError></NativeBaseProvider>).toJSON()

  expect(tree).toMatchSnapshot();
});
