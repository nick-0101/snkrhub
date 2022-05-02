import * as React from 'react';
import renderer from 'react-test-renderer';

import { FontAwesome5 } from '@expo/vector-icons';
import { Icon } from "native-base";
import AnalyticCard from './AnalyticCard';
import { NativeBaseProvider } from 'native-base';

// test that inventory item accepts correct props
it(`analytics card accepts the correct props`, () => {
  const props = {
    mainStat: 200, 
    width: '38%',
    subtext: 'Inventory sold',
    cardIcon: <Icon as={FontAwesome5} name="shopping-bag" size="3" color="white" ml="0.2"/>
  }

  const tree = renderer.create(
    <NativeBaseProvider>
      <AnalyticCard {...props} />
    </NativeBaseProvider>
  ).toJSON()

  expect(tree).toMatchSnapshot();
});
