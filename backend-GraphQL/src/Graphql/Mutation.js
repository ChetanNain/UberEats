const { getDishes } = require("../controller/dishController");
const { Customer, Dish } = require ('../Graphql/TypeDef');
const UserController = require('../controller/userController');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } = require("graphql");


const mutation = new GraphQLObjectType({
    name: 'customerMutation',
    fields: {
        register: {
            type: Customer,
            args: {},
            resolve(parent, args){
                return Customer;
            }
        }
    }
});

module.exports = {
    mutation
}