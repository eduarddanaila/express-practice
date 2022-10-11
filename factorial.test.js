const factorialTest = require("./factorial.exercise");
const { expect } = require("chai");

describe("factorial tests", () => {
    it("should be 5!", () => {
        expect(factorialTest(120)).to.equal(5 + "!")
    })

    it("should fail", () => {
        expect(factorialTest(120)).to.equal(4 + "!")
    })
})
