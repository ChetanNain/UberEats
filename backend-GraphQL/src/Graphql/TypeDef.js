const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLInputObjectType } = require("graphql");
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

const Cart = new GraphQLObjectType({
    name: 'Cart',
    fields:()=>({
        customerMobileNumber: {type: GraphQLString},
        dishId: { type: Dish},
        restaurantMobileNumber: {type: GraphQLString},
        quantity: {type: GraphQLInt},
        itemPrice: {type: GraphQLFloat},
        totalPrice: {type: GraphQLFloat},
        checkedOut: {type: GraphQLInt},
        specialInstruction: {type: GraphQLString},
        date: {type: GraphQLString},
        status: {type: GraphQLString}
    })
})
module.exports = {
    Customer,
    Restaurant,
    Dish,
    Cart
}