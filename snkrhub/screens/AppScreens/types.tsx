import { RowMap } from 'react-native-swipe-list-view';

export type RootTabs = {
  Home: undefined;
  
  // Inventory
  InventoryNest: { addedInventory: boolean } | undefined;
  Inventory: undefined;
  AddShoe: undefined;

  // Misc
  Loading: undefined;
};

/*
* Inventory
*/

// Inventory item data
export interface InventoryData {
  id: number;
  name: string;
  shoesize: number;
  purchaseprice: number;
}

// Inventory item swiper
export type InventorySwiperRow = RowMap<{ key: string; text: string }>

/*
* Analytics
*/
export interface AnalyticsData {
  inventorycount: number;
  inventorysold: number;
  inventoryvalue: number;
  itemspend: number;
}

export interface AnalyticsRangeData {
  inventoryvalue: number;
  createdAt: string;
}

export interface FormattedAnalyticsData {
  x: number;
  y: number;
}