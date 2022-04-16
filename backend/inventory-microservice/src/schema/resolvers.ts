export {};

// Types
interface User {
  id: string
  username: string
}

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" }
    }
  },

    //  https://www.apollographql.com/docs/federation/entities#2-define-a-reference-resolver
  user: {
    __resolveReference(user: User, { fetchUserById }: any){
      return fetchUserById(user.id)
    }
  }
};

module.exports = {resolvers}