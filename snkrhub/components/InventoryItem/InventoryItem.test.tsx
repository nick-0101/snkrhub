import * as React from 'react';
import renderer from 'react-test-renderer';

import InventoryItem from './InventoryItem';
import { NativeBaseProvider } from 'native-base';

// test that inventory item accepts correct props
it(`form error renders error correctly`, () => {
    const props = {
        name: 'Test item', 
        size: 10.5,
        price: 120,
        index: 0
    }

  const tree = renderer.create(
    <NativeBaseProvider>
        <InventoryItem {...props} />
    </NativeBaseProvider>
).toJSON()

  expect(tree).toMatchSnapshot();
});
