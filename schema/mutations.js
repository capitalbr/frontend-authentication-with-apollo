const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");
const PostType = require("./post_type");
const Post = require("../models/Post")


const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // this will be the name of this mutation
    register: {
      // creating a User type
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, data) {
        return AuthService.register(data);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      async resolve(_, { title, body }, context) { 
        const validUser = await AuthService.verifyUser({ token: context.token });
        if (validUser.loggedIn) {
          const id = validUser.id;
          return new Post({ title, id, body }).save();
        } else {
          throw new Error("Sorry, you need to be logged in to create a post.");
        }
      }
    }
  }
});

module.exports = mutation;
