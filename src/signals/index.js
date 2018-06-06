import { monorepoReleaseSetup } from './monorepoRelease'
import { simpleReleaseSetup } from './simpleRelease'
import { runSetup } from './run'

export const builtinSignals = {
  run: runSetup,
  monorepoRelease: monorepoReleaseSetup,
  simpleRelease: simpleReleaseSetup,
}
