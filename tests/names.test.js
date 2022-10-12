const chai = require("chai");

const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../index");

const { peopleModel } = require("../db");

describe("names test", () => {
    let testName;

    beforeEach(async () => {
        try {
            await peopleModel.deleteMany({});
            testName = await peopleModel.create({
                name: "Seb",
                address: "Antarctica"
            });
            testName = JSON.parse(JSON.stringify(testName));
            console.log();
        } catch (err) {
            console.error(err)
        }
    })
    it("should create a name", (done) => {
        const newName = {
            "name": "John",
            "address": "USA",
        }
        chai.request(server).post("/names/create").send(newName).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(201);
            chai.expect(res.body).to.include(newName);
            done();
        })
    });

    it("should get a name", (done) => {
        chai.request(server).get("/names/get/" + testName._id).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.include(testName);
            done();
        })
    });

    it("should get all names", (done) => {
        chai.request(server).get("/names/getAll").end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.deep.include(testName);
            done();
        })
    })
})

