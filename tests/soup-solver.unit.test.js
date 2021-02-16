const assert = require('assert')
const SoupSolver = require('../src/lib/soup-solver')

const mocks = [
  {
    f: 3,
    c: 3,
    content: [
      ['O', 'I', 'E'],
      ['I', 'I', 'X'],
      ['E', 'X', 'E']
    ],
    expectedMatches: 3
  },
  {
    f: 1,
    c: 10,
    content: [
      ['E', 'I', 'O', 'I', 'E', 'I', 'O', 'E', 'I', 'O']
    ],
    expectedMatches: 4
  },
  {
    f: 5,
    c: 5,
    content: [
      ['E', 'A', 'E', 'A', 'E'],
      ['A', 'I', 'I', 'I', 'A'],
      ['E', 'I', 'O', 'I', 'E'],
      ['A', 'I', 'I', 'I', 'A'],
      ['E', 'A', 'E', 'A', 'E']
    ],
    expectedMatches: 8
  },
  {
    f: 7,
    c: 2,
    content: [
      ['O', 'X'],
      ['I', 'O'],
      ['E', 'X'],
      ['I', 'I'],
      ['O', 'X'],
      ['I', 'E'],
      ['E', 'X']
    ],
    expectedMatches: 3
  },
  {
    f: 1,
    c: 1,
    content: [
      ['E']
    ],
    expectedMatches: 0
  }
]

describe('SoupSolver Unit Test Suite', function () {
  describe('#solve()', function () {
    const soupSolver = new SoupSolver()
    mocks.forEach((mock, i) => {
      it(`Soup example ${i + 1}:\n${mock.content.map(row => `\t${row.join(' ')}`).join('\n')}\n\tShould return: ${mock.expectedMatches}\n`, function () {
        assert(typeof mock.expectedMatches === 'number')
        assert.strictEqual(soupSolver.solve(mock), mock.expectedMatches)
      });
    })
  });
});
