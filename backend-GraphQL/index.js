const express = require("express");
const db = require("./db");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { query } = require('./src/Graphql/Query');
const { mutation } = require('./src/Graphql/Mutation');
const UserController = require('./src/controller/userController');
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'application/graphql' }));

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.post("/login", UserController.login);

app.listen(4000, (err)=>{
    if(!err){
        console.log('server started at port 4000');
    }
})