export {}

const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('../schema/resolvers')
const { typeDefs } = require('../schema/typeDefs')
const db = require('../clients/postgres');

beforeAll(async () => {
  await db.sync({ force: true })
})

describe('inventory microservice e2e', () => {
  it('creates an inventory item with addInventoryItem mutation', async () => {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers
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
          user_id: "askurhwuyg",
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

    expect(result.data?.addInventoryItem).toMatchObject({ "id": "1"});
  });
});