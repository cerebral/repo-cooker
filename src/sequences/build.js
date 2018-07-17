import * as cook from '../actions'

export const buildSequence = [
  cook.relatedPackagesByPackage,
  cook.build,
  cook.fireworksWithTitle('build'),
]

export const buildSetup = {
  name: 'build',
  use: { packageJson: true, npm: true },
  sequence: buildSequence,
}
