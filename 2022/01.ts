import { input } from './inputs/01_input'
import { array as A, number as N, option as O } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'

const split = input.split('\n')
const sum = (ns: Array<number>) => ns.reduce((a, b) => a + b, 0)

const main = () => {
  const indices = pipe(
    split,
    A.filterMapWithIndex((ix, s) => (s === '' ? O.some(ix) : O.none))
  )

  const chunks = indices.reduce<Array<Array<string>>>((acc, curr, i, arr) => {
    acc.push(split.slice(curr + 1, arr[i + 1]))
    return acc
  }, [])

  const chunks2 = pipe(
    indices,
    A.reduceWithIndex([] as string[][], (ix, acc, curr) =>
      pipe(acc, A.append(split.slice(curr + 1, indices[ix + 1])))
    )
  )

  // console.log('chunks2\n', chunks2)

  const sums = pipe(chunks2, A.map(A.map(Number)), A.map(sum))

  // Part 1

  const part1 = Math.max(...sums)

  console.log('part1:\n', part1)

  // Part 2

  const part2 = pipe(sums, A.sort(N.Ord), A.takeRight(3), sum)

  console.log('part2:\n', part2)
}

main()

// Non-fp-ts
const withReduce = () => {
  const indices = split.reduce<Array<number>>((acc, curr, i) => {
    if (curr === '') {
      acc.push(i)
    }
    return acc
  }, [])

  const chunks = indices.reduce<Array<Array<string>>>((acc, curr, i, arr) => {
    acc.push(split.slice(curr + 1, arr[i + 1]))
    return acc
  }, [])
}
