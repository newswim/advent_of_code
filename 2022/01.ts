import { input } from './inputs/01_input'
import { array as A, number as N, option as O } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'

const source = input.split('\n')

const sum = (ns: number[]) => ns.reduce((a, b) => a + b, 0)

const indices = pipe(
  source,
  A.filterMapWithIndex((ix, s) => (s === '' ? O.some(ix) : O.none))
)

const chunks = pipe(
  indices,
  A.reduceWithIndex([] as string[][], (ix, acc, curr) =>
    A.append(source.slice(curr + 1, indices[ix + 1]))(acc)
  )
)

const sums = pipe(chunks, A.map(A.map(Number)), A.map(sum))

// Part 1
const part1 = Math.max(...sums)

// Part 2 :: find the three largest
const part2 = pipe(sums, A.sort(N.Ord), A.takeRight(3), sum)

console.log('part1:\n', part1)
console.log('part2:\n', part2)
