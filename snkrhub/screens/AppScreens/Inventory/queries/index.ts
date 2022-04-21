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
