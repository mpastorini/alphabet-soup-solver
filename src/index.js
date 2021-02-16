const SoupSolver = require('./lib/soup-solver')
const InputManager = require('./lib/input-manager')

const soupSolver = new SoupSolver()
const inputManager = new InputManager()
const printMatches = matches => console.log(`Result: ${matches} ${matches === 1 ? 'match' : 'matches'}`)

console.log('Welcome to the alphabet soup solver!')
console.log('Please enter a soup and I will tell the number of matches: \n')

inputManager
  .getInput()
  .then(input => soupSolver.solve(input))
  .then(printMatches)
