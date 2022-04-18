import { Request } from 'express'

export interface FetchUserInventoryItemsArgs {
  offset: number;
  limit: number;
  userId: string;
}

export interface AddInventoryItemArgs {
  inventoryItem: inventoryItem
}

interface inventoryItem {
  user_id: string,
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

export interface ApolloContextData {
  userId: string;
};
