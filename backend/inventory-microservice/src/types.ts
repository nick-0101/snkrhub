import { Request } from 'express'

export interface FetchUserInventoryItemsArgs {
  offset: number;
  limit: number;
}

export interface AddInventoryItemArgs {
  inventoryItem: inventoryItem
}

interface inventoryItem {
  name: string,
  styleid: string,
  brand: string,
  colour: string,
  condition: string,
  shoesize: number,
  purchaseprice: number,
  tax: number,
  shipping: number,
  purchasedate: string,
  ordernumber: string
}

export interface DeleteInventoryItemArgs {
  itemId: number;
}

export interface ApolloContextData {
  userId: string;
};
