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
