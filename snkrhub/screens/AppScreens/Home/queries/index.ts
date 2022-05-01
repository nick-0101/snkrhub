import { gql } from '@apollo/client';

export const FETCH_INVENTORY_ANALYTICS = gql`
    query FetchInventoryAnalytics {
        fetchInventoryAnalytics {
            inventorycount
            inventorysold
            inventoryvalue
            itemspend
        }
    }
`;

export const FETCH_INVENTORY_RANGE = gql`
    query FetchInventoryValueRange($rangeInDays: Int!) {
        fetchInventoryValueRange(rangeInDays: $rangeInDays) {
            inventoryvalue
        }
    }
`