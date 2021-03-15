import { buildSetup } from './build'
import { checkDependenciesSetup } from './checkDependencies'
import { defaultReleaseSetup } from './defaultRelease'
import { linkSetup } from './link'
import { linkBinSetup } from './linkBin'
import { runSetup } from './run'

export const builtinSequences = {
  build: buildSetup,
  checkDependencies: checkDependenciesSetup,
  defaultRelease: defaultReleaseSetup,
  link: linkSetup,
  linkBin: linkBinSetup,
  run: runSetup,
}
