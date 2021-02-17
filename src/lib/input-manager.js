const prompts = require('prompts')

class InputManager {
  constructor() {
    this._dimensionSchema = [
      {
        type: 'number',
        name: 'f',
        message: `f (Rows quantity between 1 and 100)`,
        validate: this._validateDimension
      },
      {
        type: 'number',
        name: 'c',
        message: `c (Columns quantity between 1 and 100)`,
        validate: this._validateDimension
      }
    ]
  }

  /**
   * @description Validates a row
   * @param {String} row Row letters
   * @param {number} c Number of columns
   */
  _validateRow(row, c) {
    return row.match(/^[a-zA-Z]+$/) && row.length === c
  }

  /**
   * @description Validates a dimension
   * @param {number} dimension Number of columns
   */
  _validateDimension(dimension) {
    return dimension >= 1 && dimension <= 100
  }

  /**
   * @description Creates a prompt validaton schema based on number of rows and columns
   * @param {Number} f rows
   * @param {Number} c columns
   * @returns validation schema for rows
   */
  _generateSchema(f, c) {
    let rowSchema = []

    // Make a prompt of length c per row
    for (let i = 0; i < f; i++) {
      rowSchema.push({
        type: 'text',
        name: `row${i}`,
        message: `Row ${i+1} (Row letters (Only ${c} letters))`,
        validate: row => this._validateRow(row, c),
        format: row => row.toUpperCase()
      })
    }

    return rowSchema
  }

  /**
   * @description captures and parse the user input
   * @returns {Promise<Object>} A parsed input object containing f, c, and content 
   */
  async getInput() {
    const { f, c } = await prompts(this._dimensionSchema)
    const currentSchema = this._generateSchema(f, c)
    const rows = await prompts(currentSchema)
    const content = Object.keys(rows).map(key => rows[key].toUpperCase().split(''))

    return { f, c, content }
  }
}

module.exports = InputManager