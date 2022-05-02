const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers');
const { typeDefs } = require('../schema/typeDefs');

// Database
const db = require('../clients/postgres');
const InventoryAnalytics = require('../models/InventoryAnalyticsModel');
const InventoryValue = require('../models/InventoryValueModel');

describe('tests querying inventory analytics', () => {  
    beforeAll(async () => {
        // Regenreate database
        await db.sync({ force: true });

        // Insert analytics
        await InventoryAnalytics.create({ 
            user_id: 'testUserId',
            inventorycount: 5,
            itemspend: 2500,
            inventorysold: 1,
            inventoryvalue: 2000 
        })
    })

    it('queries basic stats for user inventory analytics', async () => {
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