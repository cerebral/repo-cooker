import { defaultReleaseSetup } from './defaultRelease'
import { runSetup } from './run'

export const builtinSignals = {
  run: runSetup,
  defaultRelease: defaultReleaseSetup,
}
