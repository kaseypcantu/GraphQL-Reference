'use strict'

const {ApolloServer, gql} = require('apollo-server');

const port = process.env.PORT || 9090;

const typeDefs = gql`
    type Query {
        helloTrailblazers: String
        listAccounts(status: Status): [Account!]!
    }
  
  type Account {
      name: String!
      status: Status
  }
  
  enum Status {
      ACTIVE
      INACTIVE
  }
`

const accounts = [
  {
    name: 'Zeus',
    status: 'INACTIVE'
  },
  {
    name: 'Apollo',
    status: 'ACTIVE'
  },
  {
    name: 'Ben',
    status: 'INACTIVE'
  }
]

const resolvers = {
  Query: {
    helloTrailblazers() {
      return 'Hello Node.js from GraphQL'
    },
    listAccounts (_, args) {
      const { status } = args;

      if (!status) return accounts;

      return accounts.filter(a => a.status === status)
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  tracing: true
});

server.listen(port)
  .then(() => {
  console.log(`Server is listening on http://localhost:${port}`);
});
