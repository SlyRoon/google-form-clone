import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs  } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const server = new ApolloServer ({typeDefs , resolvers})

const startServer = async () => {
    const {url} = await startStandaloneServer(server,{
        listen: {port: 4000},
    })
    console.log(`Успішний запуск серверу: ${url}`)
}

startServer()