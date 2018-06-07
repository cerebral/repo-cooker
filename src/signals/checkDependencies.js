import * as cook from '../actions'

export const checkDependenciesSignal = [
  cook.getDependencies,
  cook.checkDependencies,
  cook.fixDependencies,
  cook.fireworksWithTitle('check dependencies'),
]

export const checkDependenciesSetup = {
  // Providers that we use for this signal
  use: { packageJson: true },
  signal: checkDependenciesSignal,
}
