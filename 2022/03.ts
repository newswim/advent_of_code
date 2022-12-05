import { array as A, number as N, string as Str } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { input } from './inputs/03_input'

// look-up

const letters: Record<string, number> = {}

for (let i = 0; i < 26; i++) {
  letters[String.fromCharCode(97 + i)] = i + 1 // lowercase letters
}

for (let i = 0; i < 26; i++) {
  letters[String.fromCharCode(65 + i)] = i + 26 + 1 // uppercase letters
}

const part1 = pipe(
  input.split('\n'),
  A.chain(s => {
    const first = s.slice(0, s.length / 2).split('')
    const second = s.slice(s.length / 2).split('')

    return pipe(
      A.intersection(Str.Eq)(first, second),
      A.uniq(Str.Eq),
      A.map(letter => letters[letter])
    )
  }),
  A.reduce(0, N.MonoidSum.concat)
)

console.log('part1\n', part1)

const part2 = pipe(
  input.split('\n'),
  A.chunksOf(3),
  A.chain(([first, second, third]) =>
    pipe(
      first.split(''),
      A.intersection(Str.Eq)(second.split('')),
      A.intersection(Str.Eq)(third.split('')),
      A.uniq(Str.Eq),
      A.map(letter => letters[letter])
    )
  ),
  A.reduce(0, N.MonoidSum.concat)
)

console.log('part2\n', part2)
