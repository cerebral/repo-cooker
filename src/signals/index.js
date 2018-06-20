import { checkDependenciesSetup } from './checkDependencies'
import { defaultReleaseSetup } from './defaultRelease'
import { linkSetup } from './link'
import { runSetup } from './run'

export const builtinSignals = {
  checkDependencies: checkDependenciesSetup,
  defaultRelease: defaultReleaseSetup,
  link: linkSetup,
  run: runSetup,
}
