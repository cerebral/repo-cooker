import { props } from 'function-tree/tags'
import * as cook from '../actions'

export const runSignal = [cook.runNpmScript(props`cmd`)]

export const runSignalSetup = {
  use: { npm: true },
  signal: runSignal,
}
