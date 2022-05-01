export interface ApolloContextData {
  userId: string;
};

export interface UpdateInventoryAnalyticsArgs {
  inventoryItem: inventoryItem
}

export interface FetchInventoryValueRangeArgs {
  rangeInDays: number
}

export interface UpdateInventoryAnalyticsItemSoldArgs {
  inventoryItem: inventoryItem
}

interface inventoryItem {
  purchaseprice: number,
}
