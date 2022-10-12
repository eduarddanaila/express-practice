const {expect} = require("chai");

const doggo = require("../tests/doggo");

describe ("doggo tests" , () => {
    it("should have a length of 99", () => {
        expect(doggo(44).length).to.equal(99);
    });
    it("should not contain 37", () => {
        expect(doggo(37)).to.not.include("37th");
    })
})
