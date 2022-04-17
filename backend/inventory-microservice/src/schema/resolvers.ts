export {};

// Types
import { InventoryItem, AddInventoryItemArgs } from '../types';

interface test {
  name: string
}

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" }
    }
  },

  Mutation: {
    addInventoryItem: async (parent: undefined, args: AddInventoryItemArgs) => {
      // const user = await dataSources.userAPI.findOrCreateUser({ email });
      // if (user) {
      //   user.token = Buffer.from(email).toString('base64');
      //   return user;
      // }
      return {"name": args.name}
    },  
  },

  //  https://www.apollographql.com/docs/federation/entities#2-define-a-reference-resolver
  // user: {
  //   __resolveReference(user: User, { fetchUserById }: any){
  //     return fetchUserById(user.id)
  //   }
  // }
};

module.exports = {resolvers}