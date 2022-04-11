import * as React from 'react';
import renderer from 'react-test-renderer';

import FormError from './FormError';

it(`form error renders error correctly`, () => {
  const tree = renderer.create(<FormError error='Incorrect password'></FormError>).toJSON()

  expect(tree).toMatchSnapshot();
});
