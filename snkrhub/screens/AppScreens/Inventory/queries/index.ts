import { gql } from '@apollo/client';

export const FETCH_INVENTORY_ITEMS = gql`
    query Query($offset: Int!, $limit: Int!) {
        fetchUserInventoryItems(offset: $offset, limit: $limit) {
            id
            name
            shoesize
            purchaseprice
        }
    }
`;


export const DELETE_INVENTORY_ITEM = gql`
    mutation DeleteInventoryItem($itemId: Int!) {
        deleteInventoryItem(itemId: $itemId) {
            id  
        }
    }
`;

export const ADD_INVENTORY_ITEM = gql`
    mutation AddInventoryItem($inventoryItem: InventoryItemInput!) {
        addInventoryItem(inventoryItem: $inventoryItem) {
            id
        }
    }
`;