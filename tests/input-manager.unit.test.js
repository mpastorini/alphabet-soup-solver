const assert = require('assert')
const prompts = require('prompts')
const InputManager = require('../src/lib/input-manager')

describe('InputManager Unit Test Suite', function () {
  const inputManager = new InputManager()

  describe('#getInput()', function () {
    it('Should parse input to object', async () => {
      prompts.inject([3, 3, 'oie', 'iix', 'exe']);
      const result = await inputManager.getInput()
      assert.deepStrictEqual(result, {
        f: 3,
        c: 3,
        content: [
          ['O', 'I', 'E'],
          ['I', 'I', 'X'],
          ['E', 'X', 'E']
        ]
      })
    })
  })

  describe('#_validateRow()', function () {
    it('Should return true when row match with length', async () => {
      assert.strictEqual(inputManager._validateRow('test', 4), true)
    })
    it('Should return false when row does not match with length', async () => {
      assert.strictEqual(inputManager._validateRow('test', 3), false)
    })
  })

  describe('#_validateDimension()', function () {
    it('Should return true when dimension is between 1 and 100', async () => {
      assert.strictEqual(inputManager._validateDimension(50), true)
    })

    it('Should return true when dimension is 1', async () => {
      assert.strictEqual(inputManager._validateDimension(1), true)
    })

    it('Should return true when dimension is 100', async () => {
      assert.strictEqual(inputManager._validateDimension(100), true)
    })

    it('Should return true when dimension is > 100', async () => {
      assert.strictEqual(inputManager._validateDimension(101), false)
    })

    it('Should return true when dimension is < 1', async () => {
      assert.strictEqual(inputManager._validateDimension(0), false)
    })
  })

  describe('#_generateSchema', function () {
    it('Should return a row prompt schema', async () => {
      const schemas = inputManager._generateSchema(2, 3)
      const expectedResponse = [
        {
          type: 'text',
          name: `row0`,
          message: `Row 1 (Row letters (Only 3 letters))`,
          validate: schemas[0].validate,
          format: schemas[0].format
        },
        {
          type: 'text',
          name: `row1`,
          message: `Row 2 (Row letters (Only 3 letters))`,
          validate: schemas[1].validate,
          format: schemas[1].format
        }
      ]
      assert.deepStrictEqual(schemas.length, 2)
      assert.deepStrictEqual(schemas[0], expectedResponse[0])
      assert.deepStrictEqual(schemas[1], expectedResponse[1])
    })
  })
})
