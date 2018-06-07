import { defaultReleaseSetup } from './defaultRelease'
import { runSetup } from './run'
import { checkDependenciesSetup } from './checkDependencies'

export const builtinSignals = {
  checkDependencies: checkDependenciesSetup,
  defaultRelease: defaultReleaseSetup,
  run: runSetup,
}
