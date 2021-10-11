var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);


describe('API Testing', ()=>{
    describe('Login API', ()=>{
        it('Should respond with 401 status code when username and password doesn\'t match',() => {
            agent.post("/login")
                .send({ mobileNumber: "customer@sjsu.edu", password: "password" })
                .then(function (res) {
                    expect(res.text).to.equal('{"msg":"Invalid user name or password"}');
                })
                .catch(error => {
                    console.log(error);
                });
        });


        it('Should login with a valid username and password combination',() => {
            agent.post("/login")
                .send({ mobileNumber: "user1@gmail.com", password: "123456789" })
                .then(function (res) {
                    expect(res.body.msg).to.equal("LoggedIn successfully");
                })
                .catch(error => {
                    console.log(error);
                });
        });

    })


    describe('Filter API', ()=>{
        it('should return all the available dishes', ()=>{
                agent.post('/dishes').send().then(res=>{
                    const totalCount = res.data.length;
                    expect(totalCount).to.greaterThanOrEqual(0);
                })
        })
        it('should give all the data when no filter applied', ()=>{
                const filters=[];
                agent.post('/dishes').send(filters).then(res=>{
                    const totalCount = res.data.length;
                    filters.push({mealType: ['Lunch']});

                    agent.post('/dishes').send(filters).then(res=>{
                        const filteredData = res.data.length;
                        expect(totalCount).to.greaterThanOrEqual(filteredData);
                    })
                })
        })
    })
})