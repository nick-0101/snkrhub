import { gql } from '@apollo/client';

export const FETCH_USER_INVENTORY = gql`
  query Homepage($limit: String) {
    trendingItems(limit: $limit) {
      image
      title
      salesTotal
      retailPrice
    }
  }
`;
