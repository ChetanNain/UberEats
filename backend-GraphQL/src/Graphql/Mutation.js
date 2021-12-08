const { getDishes } = require("../controller/dishController");
const { Customer, Dish } = require ('../Graphql/TypeDef');
const UserController = require('../controller/userController');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } = require("graphql");


const mutation = new GraphQLObjectType({
    name: 'customerMutation',
    fields: {
        register: {
            type: Customer,
            args: { 
                fullName: {type: GraphQLString},
                dateOfBirth: {type: GraphQLString},
                email: {type: GraphQLString},
                mobileNumber:  {type: GraphQLString},
                password: {type: GraphQLString},
                favorites:   {type: new GraphQLList(GraphQLInt)},
                profilePicture: {type: GraphQLString},
                language: {type: GraphQLString},
                restFlg: {type: GraphQLInt},
                userType: {type: GraphQLString },
                uploadedFile:  { type: GraphQLString },
                address: {type: GraphQLString },
                city: {type: GraphQLString },
                state: {type: GraphQLString },
                country: {type: GraphQLString }
        },
            resolve: async (parent, args) =>{
                return await UserController.addUser(args);
            }
        }
    }
});

module.exports = {
    mutation
}