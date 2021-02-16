const assert = require('assert')
const InputManager = require('../src/lib/input-manager')
var robot = require("robotjs");

var roboInput = (input) => {
    robot.typeString(input);
    robot.keyTap("enter");
};
var roboInputArr = (inputs) => {
  inputs.forEach(ip =>{
      roboInput(ip);
  });
};

describe('InputManager Unit Test Suite', function() {
  describe('#getInput()', function() {
    const inputManager = new InputManager()
      it(`Should take and input and return a parsed soup`, async () => {
        setTimeout(() => roboInputArr([3, 3]), 10)
        setTimeout(() => roboInputArr(['oie', 'iix', 'exe']), 1000)
        const result = await inputManager.getInput()
        assert.deepStrictEqual(result, {
          f: 3,
          c: 3,
          content: [
            ['O','I','E'],
            ['I','I','X'],
            ['E','X','E']
          ]
        })
      })
  })
})
