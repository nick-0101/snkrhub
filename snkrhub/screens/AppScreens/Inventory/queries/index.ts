import { gql } from '@apollo/client';

export const FETCH_INVENTORY_ITEMS = gql`
    query Query($offset: Int!, $limit: Int!, $userId: String!) {
        fetchUserInventoryItems(offset: $offset, limit: $limit, userId: $userId) {
            id
            name
            shoesize
            brand
        }
    }
`;
