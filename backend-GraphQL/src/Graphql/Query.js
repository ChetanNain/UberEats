const { getDishes } = require('../controller/dishController');
const { Customer, Dish, Cart } = require ('../Graphql/TypeDef');
const UserController = require('../controller/userController');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } = require("graphql");

const query = new GraphQLObjectType({
    name: 'query',
    fields: {
        getCustomer : {
            type: Customer,
            args: {
                mobileNumber: { type: GraphQLString } ,
                password: { type: GraphQLString }
            },
            resolve: async (parent, args)=> {
                const response = await UserController.login(args.mobileNumber, args.password);
                return response;
            }

        },
        // getRestaurant : {
        //     type: Restautant,
        //     args: {},
        //     resolve: async (parent, args, context)=> {
        //         const response = await UserController.getRestaurant(context);
        //         return response;
        //     }
        // },
        getDishes: {
            type: new GraphQLList(Dish),
            args: {
                searchQuery: {type: GraphQLString},
                mealType : {type: new GraphQLList(GraphQLString)},
                dishType: {type: new GraphQLList(GraphQLString)},
                dishCategory: {type: new GraphQLList(GraphQLString)},
                restaurantType: {type: new GraphQLList(GraphQLString)}
            },
            resolve: async (parent, args) =>{
               return await getDishes({body: args});
            }
        },
        getCart:{
            type: new GraphQLList(Cart),
            resolve: async (parent, args, context)=> {
                return await UserController.getCart(context);
            }
        },
        getOrders:{
            type: new GraphQLList(Cart),
            resolve: async (parent, args, context) => {
                return await UserController.getOrders(context);
            }
        }
    }
});

module.exports = {
    query
}