const express = require("express");
const router = express.Router();
const db = require("./db");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } = require("graphql");
const UserController = require('./src/controller/userController');
const { getDishes } = require("./src/controller/dishController");
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'application/graphql' }));

const Customer = new GraphQLObjectType({
    name: 'Customer',
    fields:()=>({
        _id: {type: GraphQLString},
        fullName: {type: GraphQLString},
        dateOfBirth: {type: GraphQLString},
        email: {type: GraphQLString},
        mobileNumber:  {type: GraphQLInt},
        password: {type: GraphQLString},
        favorites:   {type: new GraphQLList(GraphQLInt)},
        profilePicture: {type: GraphQLString},
        language: {type: GraphQLString},
        restFlg: {type: GraphQLInt},
        address: {type: new GraphQLList(GraphQLString)}
    })
});

const Restaurant = new GraphQLObjectType({
    name: 'Restaurant',
    fields:()=>({
        mobileNumber: {type: GraphQLString},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        city: {type: GraphQLString},
        provience: {type: GraphQLString},
        pincode: {type: GraphQLString},
        images: {type: GraphQLString},
        description:{type: GraphQLString},
        restaurantType:{type: GraphQLString},   
    })
});

const Dish = new GraphQLObjectType({
    name: 'Dish',
    fields:()=>({
        dishId: {type: GraphQLString},
        restaurantMobileNumber: {type: GraphQLString},
        dishName: {type: GraphQLString},
        mainIngredients: {type: GraphQLString},
        dishImage: {type: GraphQLString},
        dishPrice: {type: GraphQLFloat},
        description: {type: GraphQLString},
        dishCategory:{type: GraphQLString},
        dishTag:{type: GraphQLString},
        dishType:{type: GraphQLString},  
        restaurantId: {type: Restaurant},
    })
});

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
        }
    } 
});

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

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(4000, (err)=>{
    if(!err){
        console.log('server started at port 4000');
    }
})