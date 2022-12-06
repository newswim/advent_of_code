import {
  array as A,
  string as Str,
  readonlyNonEmptyArray as RNEA,
  number as N,
  option as O,
} from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { input } from './inputs/04_input'

const source = input.split('\n')

const part1 = pipe(
  source,
  A.filterMap(s => {
    const a = Str.split(',')(s)
    const b = RNEA.chain(Str.split('-'))(a)
    const c = RNEA.map(Number)(b)
    const [x1, y1, x2, y2] = c

    return (x1 >= x2 && y1 <= y2) || (x1 <= x2 && y1 >= y2) ? O.some(1) : O.none
  }),
  A.reduce(0, N.MonoidSum.concat)
)

console.log('part1\n', part1)

const part2 = pipe(
  source,
  A.filterMap(s => {
    const a = Str.split(',')(s)
    const b = RNEA.chain(Str.split('-'))(a)
    const c = RNEA.map(Number)(b)
    const [x1, y1, x2, y2] = c

    const range1 = RNEA.range(x1, y1)
    const range2 = RNEA.range(x2, y2)

    const g1 = A.intersection(N.Eq)(Array.from(range1), Array.from(range2))

    return g1.length > 0 ? O.some(1) : O.none
  }),
  A.reduce(0, N.MonoidSum.concat)
)

console.log('part2\n', part2)
