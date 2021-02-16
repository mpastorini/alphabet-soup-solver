const prompt = require('prompt')
const { promisify } = require('util')
const getPrompt = promisify(prompt.get)

const dimensionsSchema = {
  properties: {
    f: {
      default: 3,
      description: 'Rows quantity (1-100)',
      maximum: 100,
      message: 'f represents the number of rows, is required and should be integer between 1 and 100',
      minimum: 1,
      required: true,
      type: 'integer'
    },
    c: {
      default: 3,
      description: 'Columns quantity (1-100)',
      maximum: 100,
      message: 'c represents the number of columns, is required and should be integer between 1 and 100',
      minimum: 1,
      required: true,
      type: 'integer'
    }
  }
}

class InputManager {

  /**
   * @description Creates a prompt validaton schema based on number of rows and columns
   * @param {Number} f rows
   * @param {Number} c columns
   * @returns validation schema for rows
   */
  _generateSchema(f, c) {
    const rowSchemaProperties = {
      minLength: c,
      maxLength: c,
      message: `Each row should contain exactly ${c} letters (Don't care about lower or upper case)`,
      pattern: /^[a-zA-Z]+$/,
      required: true,
      type: 'string'
    }

    const rowSchema = { properties: {} }
    for (let i = 0; i < f; i++) {
      rowSchema.properties[`row ${i + 1}`] = rowSchemaProperties
    }

    return rowSchema
  }

  /**
   * @description captures and parse the user input
   * @returns {Promise<Object>} A parsed input object containing f, c, and content 
   */
  async getInput() {
    prompt.start()

    const { f, c } = await getPrompt(dimensionsSchema)
    const currentSchema = this._generateSchema(f, c)

    const rows = await getPrompt(currentSchema)
    const content = Object.keys(rows).map(key => rows[key].toUpperCase().split(''))

    return { f, c, content }
  }
}

module.exports = InputManager