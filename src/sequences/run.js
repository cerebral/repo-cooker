import * as cook from '../actions'

import { props, string } from 'function-tree/tags'

export const runSequence = [
  cook.runNpmScript(props`cmd`),
  cook.fireworksWithTitle(string`run ${props`cmd`}`),
]

export const runSetup = {
  name: 'run',
  use: { npm: true },
  sequence: runSequence,
}
