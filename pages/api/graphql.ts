import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Card {
    id: Int
    name: String!
    email: String!
    phone: String!
    biography: String!
    twitter: String!
    github: String!
    website: String!
  }

  input CardInput {
    id: Int
    name: String!
    email: String!
    phone: String!
    biography: String!
    twitter: String!
    github: String!
    website: String!
  }

  type Query {
    getCards: [Card]
    getCard(id: String!): Card
  }

  type Mutation {
    addCard(input: CardInput!): Card
    deleteCard(id: String!): Card
  }
`;

const resolvers = {
  Query: {
    getCards: async () => {
      const cards = await prisma.card.findMany({
        take: 10,
      });
      return cards;
    },
    getCard: async (_, args) => {
      return prisma.card.findFirst({
        where: {
          cardId: args.id,
        },
      });
    },
  },
  Mutation: {
    addCard: async (_, args) => {
      return prisma.card.create({
        data: { ...args.input, cardId: uuidv4() },
      });
    },
    deleteCard: async (_, args) => {
      return prisma.card.delete({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = apolloServer.createHandler({
  path: "/api/graphql",
});

export default handler;

/**
GraphQL (Query and Mutation)
  http://localhost:3000/api/graphql
Query
  1.
    {
      getCards {
        name
        phone
      }
    }

  2. {
      getCard(id: "2") {
        name
      }
    }

Mutation
1.
(top)
  mutation AddCard($input: CardInput!) {
    addCard(input: $input) {
      name
      id
    }
}
(Query Variables)
  {
    "input": {
      "name": "laoyeche",
      "email": "laoyeche@gmail.com",
      "phone": "0178883321",
      "biography": "Do it",
      "github": "https://github.com/laoyeche",
      "website": "https://laoyeche.com",
      "twitter": "https://twitter.com/laoyeche"
    }
  }
2.
  mutation {
    deleteCard(id: "3"){
      name
      email
    }
  }

*/
