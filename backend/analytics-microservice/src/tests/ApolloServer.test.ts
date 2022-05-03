
const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers');
const { typeDefs } = require('../schema/typeDefs');
const dayjs = require('dayjs')

// Database
const db = require('../clients/postgres');
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');

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

})

// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
  db.close()
  done()
})