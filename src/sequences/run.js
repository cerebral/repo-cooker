import * as cook from '../actions'

import { props } from 'function-tree/tags'

export const runSequence = [
  cook.runNpmScript(props`cmd`),
  cook.fireworksWithTitle('run'),
]

export const runSetup = {
  name: 'run',
  use: { npm: true },
  sequence: runSequence,
}
