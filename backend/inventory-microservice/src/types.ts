import { Request } from 'express'

// typeDefs.ts
export interface User {
  id: string
  username: string
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

// server.ts
export interface ApolloContextData {
  userId: string;
};
