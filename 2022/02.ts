import { input } from './02_input'

type Theirs = 'A' | 'B' | 'C'
type Mine = 'X' | 'Y' | 'Z'

// 1 for Rock, 2 for Paper, and 3 for Scissors
const shapeToScore = {
  X: 1,
  Y: 2,
  Z: 3,
} as const

// Look-up tables

const theirsA = {
  X: 'draw',
  Y: 'won',
  Z: 'lost',
} as const

const theirsB = {
  X: 'lost',
  Y: 'draw',
  Z: 'won',
} as const

const theirsC = {
  X: 'won',
  Y: 'lost',
  Z: 'draw',
} as const

const outcomeToScore = {
  lost: 0,
  draw: 3,
  won: 6,
} as const

const score = (theirs: Theirs, mine: Mine) => {
  if (theirs === 'A') {
    return outcomeToScore[theirsA[mine]] + shapeToScore[mine]
  }

  if (theirs === 'B') {
    return outcomeToScore[theirsB[mine]] + shapeToScore[mine]
  }

  return outcomeToScore[theirsC[mine]] + shapeToScore[mine]
}

const strategy = input.split('\n').map(play => play.split(' ')) as Array<
  [Theirs, Mine]
>

const part1 = strategy
  .map(([theirs, mine]) => score(theirs, mine))
  .reduce((a, b) => a + b, 0)

console.log('part1\n', part1)

const responseA = {
  lost: 'Z',
  draw: 'X',
  won: 'Y',
} as const

const responseB = {
  lost: 'X',
  draw: 'Y',
  won: 'Z',
} as const

const responseC = {
  lost: 'Y',
  draw: 'Z',
  won: 'X',
} as const

const score2 = (theirs: Theirs, mine: Mine) => {
  const outcome = theirsB[mine]
  const outcomeScore = outcomeToScore[outcome]

  if (theirs === 'A') {
    return outcomeScore + shapeToScore[responseA[outcome]]
  }

  if (theirs === 'B') {
    return outcomeScore + shapeToScore[responseB[outcome]]
  }

  return outcomeScore + shapeToScore[responseC[outcome]]
}

const part2 = strategy
  .map(([theirs, mine]) => score2(theirs, mine))
  .reduce((a, b) => a + b, 0)

console.log('part2\n', part2)
