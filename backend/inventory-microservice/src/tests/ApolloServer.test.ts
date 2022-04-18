export {}

const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers')
const { typeDefs } = require('../schema/typeDefs')
const db = require('../clients/postgres');
const Inventory = require('../models/inventoryModel');

describe('tests creating inventory items', () => {
  beforeAll(async () => {
    // Regenreate database
    await db.sync({ force: true })
  })

  it('creates an inventory item with addInventoryItem mutation', async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: 'testUserId' }),
    });

    const result = await testServer.executeOperation({
      query: `
        mutation AddInventoryItem($inventoryItem: InventoryItemInput!) {
          addInventoryItem(inventoryItem: $inventoryItem) {
            id
          }
        }
      `,
      variables: {
        inventoryItem: {
          user_id: "testUserId",
          name: "Nike air force",
          styleid: "DHAG",
          brand: "Nike",
          colour: "Black/White",
          condition: "Used",
          shoesize: 11,
          purchaseprice: 110,
          tax: 10,
          shipping: 0.00,
          purchasedate: "2022-11-02",
          ordernumber: "sadfsdfsdf"
        }
      },
    });

    expect(result.data?.addInventoryItem).toMatchObject({ "id": 1 });
  });
});

describe('tests reading inventory items', () => {  
  beforeAll(async () => {
    // Regenreate database
    await db.sync({ force: true })

    // Generate mock data
    const item = {
        user_id: "testUserId",
        name: "Nike air force",
        styleid: "DHAG",
        brand: "Nike",
        colour: "Black/White",
        condition: "Used",
        shoesize: 11,
        purchaseprice: 110,
        tax: 10,
        shipping: 0.00,
        purchasedate: "2022-11-02",
        ordernumber: "sadfsdfsdf"
      }
      await Inventory.bulkCreate([item, item, item, item]);
  })

  it('queries inventory items with fetchUserInventoryItems query', async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ userId: 'testUserId' }),
    });

    // Query for first 2 items 
    const result = await testServer.executeOperation({
      query: `
        query Query($offset: Int!, $limit: Int!, $userId: String!) {
          fetchUserInventoryItems(offset: $offset, limit: $limit, userId: $userId) {
            id
          }
        }
      `,
      variables: {  
        offset: 0,
        limit: 2,
        userId: "testUserId"
      }
    });

    // Expect 2 results
    expect(result.data?.fetchUserInventoryItems).toMatchObject([{ "id": 1 }, { "id": 2 }]);
  });
})


// Closing the DB connection allows Jest to exit successfully.
afterAll((done) => {
  db.close()
  done()
})