import { mutationResolver } from "./mutations";
import { queryResolvers } from "./queries";

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolver
};