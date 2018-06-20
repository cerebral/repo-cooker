import * as cook from '../actions'

import { props } from 'function-tree/tags'

export const runSequence = [cook.runNpmScript(props`cmd`)]

export const runSetup = {
  use: { npm: true },
  sequence: runSequence,
}
