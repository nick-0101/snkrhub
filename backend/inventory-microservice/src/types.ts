import { Request } from 'express'

// typeDefs.ts
export interface User {
  id: string
  username: string
}

export type AddInventoryItemArgs = {
  name: string
};

export interface InventoryItem {
    id: number,
    user_id: string,
    name: string,
    styleId: string,
    brand: string,
    colour: string,
    condition: string,
    shoeSize: number,
    purchasePrice: number,
    tax: number,
    shipping: number,
    purchaseDate: string,
    orderNumber: number
}

// server.ts
export interface ApolloContext {
  req: Request;
};
