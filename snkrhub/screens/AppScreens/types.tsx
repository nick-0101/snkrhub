import { RowMap } from 'react-native-swipe-list-view';

export type RootTabs = {
  Home: undefined;
  
  // Inventory
  Inventory: undefined;
  AddShoe: undefined;

  // Misc
  Loading: undefined;
};

// Inventory item data
export interface InventoryData {
  id: number;
  name: string;
  shoesize: number;
  purchaseprice: number;
}

// Inventory item swiper
export type InventorySwiperRow = RowMap<{ key: string; text: string }>