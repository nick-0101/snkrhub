
const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers');
const { typeDefs } = require('../schema/typeDefs');
const dayjs = require('dayjs')

// Database
const db = require('../clients/postgres');
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');

// Queries
describe('tests querying inventory analytics', () => {  
    beforeAll(async () => {
        // Regenreate database
        await db.sync({ force: true });

        // Insert into inventory_analytics table
        await InventoryAnalytics.create({ 
            user_id: 'testUserId',
            inventorycount: 5,
            itemspend: 2500,
            inventorysold: 1,
            inventoryvalue: 2000 
        })

        // Insert into inventory_value table
        await InventoryValue.bulkCreate([
            { 
                user_id: 'testUserId',
                inventoryvalue: 500,
                createdAt: dayjs().locale('en').format("YYYY-MM-DD")
            },
            {
                user_id: 'testUserId',
                inventoryvalue: 450,
                createdAt: dayjs().locale('en').format("YYYY-MM-DD")
            },
            {
                user_id: 'testUserId',
                inventoryvalue: 500,
                createdAt: dayjs().locale('en').format("YYYY-MM-DD")
            },
            {
                user_id: 'testUserId',
                inventoryvalue: 500,
                createdAt: dayjs().locale('en').format("YYYY-MM-DD")
            },
            {
                user_id: 'testUserId',
                inventoryvalue: 500,
                createdAt: dayjs().locale('en').format("YYYY-MM-DD")
            },
        ]);
    })

    it('queries basic stats from inventory_analytics table', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ userId: 'testUserId' }),
        });

        const result = await testServer.executeOperation({
            query: `
                query FetchInventoryAnalytics {
                    fetchInventoryAnalytics {
                        inventorycount
                        inventorysold
                        inventoryvalue
                        itemspend
                    }
                }
            `
        });

        expect(result.data?.fetchInventoryAnalytics).toMatchObject({ 
            inventorycount: 5,
            itemspend: 2500,
            inventorysold: 1,
            inventoryvalue: 2000 
        });
    });

    it('queries a range of analytics from inventory_value table', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ userId: 'testUserId' }),
        });

        const result = await testServer.executeOperation({
            query: `
                query FetchInventoryValueRange($rangeInDays: Int!) {
                    fetchInventoryValueRange(rangeInDays: $rangeInDays) {
                        inventoryvalue
                    }
                }
            `,
            variables: {
                rangeInDays: 7
            }
        });

        console.log(result)

        expect(result.data?.fetchInventoryValueRange).toMatchObject([
            { 
                inventoryvalue: 500
            },
            {
                inventoryvalue: 450
            },
            {
                inventoryvalue: 500
            },
            {
                inventoryvalue: 500
            },
            {
                inventoryvalue: 500
            }
        ]);
    });
})

// Mutations
describe('tests inventory analytics mutations', () => {
    beforeAll(async () => {
        // Regenreate database
        await db.sync({ force: true });

        // Insert into inventory_analytics table
        await InventoryAnalytics.create({ 
            user_id: 'testUserId',
            inventorycount: 1,
            itemspend: 200,
            inventorysold: 0,
            inventoryvalue: 200 
        })

        // Insert into inventory_value table
        await InventoryValue.create({ 
            user_id: 'testUserId',
            inventoryvalue: 0,
            createdAt: dayjs().locale('en').format("YYYY-MM-DD")
        });
    })

    it('updates analytics stats on item add', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ userId: 'testUserId' }),
        });

        const result = await testServer.executeOperation({
            query: `
                mutation UpdateAnalyticsForItemAdd($inventoryItem: InventoryAnalyticsItemAddInput!) {
                    updateAnalyticsForItemAdd(inventoryItem: $inventoryItem)
                }
            `,
            variables: {
                inventoryItem: {
                    purchaseprice: 200
                }
            },
        })

        expect(result.data?.updateAnalyticsForItemAdd).toBe('updated stats')
    });

    it('updates analytics stats on item delete', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ userId: 'testUserId' }),
        });

        const result = await testServer.executeOperation({
            query: `
                mutation UpdateAnalyticsForItemDelete($inventoryItem: InventoryAnalyticsItemDelete!) {
                    updateAnalyticsForItemDelete(inventoryItem: $inventoryItem)
                }
            `,
            variables: {
                inventoryItem: {
                    purchaseprice: 200
                }
            },
        })

        expect(result.data?.updateAnalyticsForItemDelete).toBe('updated stats')
    });

    it('updates analytics stats on item marked sold', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ userId: 'testUserId' }),
        });

        const result = await testServer.executeOperation({
            query: `
                mutation UpdateAnalyticsForItemSold($inventoryItem: InventoryAnalyticsItemSold!) {
                    updateAnalyticsForItemSold(inventoryItem: $inventoryItem)
                }
            `,
            variables: {
                inventoryItem: {
                    purchaseprice: 200
                }
            },
        })

        expect(result.data?.updateAnalyticsForItemSold).toBe('marked sold')
    });
})

// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
  db.close()
  done()
})