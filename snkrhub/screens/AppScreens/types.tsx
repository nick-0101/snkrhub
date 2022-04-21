export type RootTabs = {
  Home: undefined;
  
  // Inventory
  Inventory: undefined;
  AddShoe: undefined;

  // Misc
  Loading: undefined;
};

export interface InventoryData {
  id: number;
  name: string;
  shoesize: number;
  purchaseprice: number;
}