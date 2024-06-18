const chai = require('chai');
const supertest = require('supertest');
const chaiJsonSchema = require('chai-json-schema');
const readJsonSchema = require('../helper/helper');

chai.use(chaiJsonSchema)
const expect = chai.expect;

const URL = "https://reqres.in";

describe("reqres API testing", () => {
    var createdIdUser, createdIdRegister;
    
    it("[TC1] GET - List User", async () => {
        const schema = readJsonSchema('get_listUser_schema.json')
        const response = await supertest(URL)
            .get("/api/users?page=2");

            expect(response.status).to.equal(200)
            expect(response.body).to.be.an('object');
            expect(response.body.data).to.be.an('array')
            expect(response.body).to.be.jsonSchema(schema)
            expect(response.body.page).to.equal(2)
    });

    it("[TC2] GET - Single User", async () => {
        const schema = readJsonSchema('get_singleUser_schema.json')
        const response = await supertest(URL)
            .get("/api/users/2");

            expect(response.status).to.equal(200)
            expect(response.body).to.be.an('object')
            expect(response.body).to.be.jsonSchema(schema)
    });

    it("[TC3] - POST Create - validData", async () => {
        const schema = readJsonSchema('post_create_schema.json')
        const body = {
                "name": "Freya Illaya",
                "role": "Tech Lead",
                "address": "Jakarta",
                "email": "frellaya@gmail.com",
                "age": 25,
                "avatar" : "https://reqres.in/img/faces/12-image.jpg"
        }

        const response = await supertest(URL)
            .post("/api/users")
            .send(body);

            expect(response.status).to.be.oneOf([200, 201])
            expect(response.body).to.be.jsonSchema(schema)
            expect(response.body).to.have.property('id')

            createdIdUser = response.body.id;
            console.log(response.body)
    });

    it("[TC4] - POST Create - Accept Missing Required Properties", async () => {
        const schema = readJsonSchema('post_create_schema.json')
        const invalidBody = {
                "name": "Freya Illaya Handayani",
                "address": "Bandung",
                //without role, email, age, avatar
        };
    
        const response = await supertest(URL)
            .post("/api/users")
            .send(invalidBody);

            expect(response.status).to.equal(400)
            expect(response.invalidBody).to.be.jsonSchema(schema)
    });

    it("[TC5] - POST Register - validData", async () => {
        const schema = readJsonSchema('post_register_schema.json')
        const body = {
                "email": "janet.weaver@reqres.in",
                "password": "inipasswordceritanya7276x"
        }

        const response = await supertest(URL)
            .post("/api/register")
            .send(body);

            expect(response.status).to.be.oneOf([200, 201])
            expect(response.body).to.be.jsonSchema(schema)
            expect(response.body).to.have.property('id')

            createdIdRegister = response.body.id;
    });

    it("[TC6] - POST Register - invalidData", async () => {
        const schema = readJsonSchema('post_register_schema.json')
        const body = {
                "email": "janet.weaver@reqres.in"
                //without password
        }

        const response = await supertest(URL)
            .post("/api/register")
            .send(body);

            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal('Missing password')
    });

    it("[TC7] DELETE User", async () => {
        const response = await supertest(URL)
            .delete(`/api/users/${createdIdUser}`);
        
            expect(response.status).to.equal(204)
    });

    it("[TC8] - PUT Update - validData", async () => {
        const schema = readJsonSchema('put_update_schema.json')
        const body = {
                "name": "Freya Illaya Handayani",
                "role": "Tech Lead - FE",
                "address": "Jakarta",
                "email": "frellaya.handayani@gmail.com",
                "age": 27,
                "avatar" : "https://reqres.in/img/faces/3-image.jpg"
        }

        const response = await supertest(URL)
            .put(`/api/users/${createdIdUser}`)
            .send(body);

            expect(response.status).to.be.oneOf([200, 201])
            expect(response.body).to.be.jsonSchema(schema)

            console.log(response.body)
    });

    it("[TC9] - PUT Update - Accept Missing Required Properties", async () => {
        const schema = readJsonSchema('put_update_schema.json')
        const invalidBodyUpdate = {
                "name": "Freya Illaya Handayani",
                "address": "Bandung",
                //without role, email, age, avatar
        }

        const response = await supertest(URL)
            .put(`/api/users/${createdIdUser}`)
            .send(invalidBodyUpdate);

            expect(response.status).to.equal(400)
            expect(response.invalidBodyUpdate).to.be.jsonSchema(schema)
    });
});