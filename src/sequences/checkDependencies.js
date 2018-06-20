import * as cook from '../actions'

export const checkDependenciesSequence = [
  cook.getDependencies,
  cook.checkDependencies,
  cook.fixDependencies,
  cook.fireworksWithTitle('check dependencies'),
]

export const checkDependenciesSetup = {
  // Providers that we use for this signal
  use: { packageJson: true },
  sequence: checkDependenciesSequence,
}
