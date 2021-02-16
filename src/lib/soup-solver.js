const nextPositionMethods = {
  row: (x, y, i) => ({ x: x + i, y }),
  column: (x, y, i) => ({ x, y: y + i }),
  diagonalUp: (x, y, i) => ({ x: x + i, y: y + i }),
  diagonalDown: (x, y, i) => ({ x: x + i, y: y - i }),
  rRow: (x, y, i) => ({ x: x - i, y: y }),
  rColumn: (x, y, i) => ({ x: x, y: y - i }),
  rDiagonalUp: (x, y, i) => ({ x: x - i, y: y + i }),
  rDiagonalDown: (x, y, i) => ({ x: x - i, y: y - i })
}

class SoupSolver {
  constructor(wordToFind = 'OIE') {
    this.wordToFind = wordToFind.toUpperCase()
  }

  /**
   * @description Counts the matches of a word within a alphabet soup
   * @param {Object} input containing content, f (rows) and c (columns)
   * @returns {Number} Number of matches
   */
  solve(input) {
    let counter = 0
    const wordToFind = this.wordToFind
    const wordLength = this.wordToFind.length
    const { content, f, c } = input

    // Check match in the given direction
    const isMatch = (x, y, getNextPosition) => {
      for (let i = 1; i < wordLength; i++) {
        const nextPos = getNextPosition(x, y, i)
        const next = content[nextPos.x][nextPos.y]
        if (next !== wordToFind[i]) return false
      }
      return true
    }

    for (let x = 0; x < f; x++) {
      for (let y = 0; y < c; y++) {
        if (content[x][y] === wordToFind[0]) {
          // Check row
          if (x <= f - wordLength) counter += +isMatch(x, y, nextPositionMethods.row)
          // Check column
          if (y <= c - wordLength) counter += +isMatch(x, y, nextPositionMethods.column)
          // Check diagonal up
          if (x <= f - wordLength && y <= c - wordLength) counter += +isMatch(x, y, nextPositionMethods.diagonalUp)
          // Check diagonal down
          if (x <= f - wordLength && y >= wordLength - 1) counter += +isMatch(x, y, nextPositionMethods.diagonalDown)
          // Check reverse row
          if (x >= wordLength - 1) counter += +isMatch(x, y, nextPositionMethods.rRow)
          // Check reverse column
          if (y >= wordLength - 1) counter += +isMatch(x, y, nextPositionMethods.rColumn)
          // Check reverse diagonal up
          if (x >= wordLength - 1 && y <= c - wordLength) counter += +isMatch(x, y, nextPositionMethods.rDiagonalUp)
          // Check reverse diagonal down
          if (x >= wordLength - 1 && y >= wordLength - 1) counter += +isMatch(x, y, nextPositionMethods.rDiagonalDown)
        }
      }
    }
    return counter
  }
}

module.exports = SoupSolver