import * as React from 'react';
import renderer from 'react-test-renderer';

import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from "native-base";
import AnalyticsChart from './AnalyticsChart';
import { NativeBaseProvider } from 'native-base';

// test that inventory item accepts correct props
it(`analytics chart correctly renders data`, () => {
  const props = {
    analyticsRangeData: [
        { inventoryvalue: 130 },
        { inventoryvalue: 165 },
        { inventoryvalue: 142 },
        { inventoryvalue: 190 }
    ]
  }

  const tree = renderer.create(
    <NativeBaseProvider>
      <AnalyticsChart {...props} />
    </NativeBaseProvider>
  ).toJSON()

  expect(tree).toMatchSnapshot();
});
