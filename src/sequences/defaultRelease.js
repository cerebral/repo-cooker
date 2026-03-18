import * as cook from '../actions'

import { logCommand } from '../helpers/execCommand'

const publishToGithub = [
  cook.tagCurrentCommit,
  cook.pushTagToRemote,
  cook.byReleaseTarget,
  {
    github: cook.createGithubRelease,
  },
]

export const defaultReleaseSequence = [
  // Make sure the release target is valid before running anything.
  cook.byReleaseTarget,
  {
    github: [],
  },
  cook.getLatestReleaseHash,
  cook.getHistoryFromHash,
  cook.getRawCommitsFromHistory,
  cook.parseCommits,
  cook.groupCommitsByPackage,
  cook.evaluateSemverByPackage,
  cook.relatedPackagesByPackage,
  cook.getCurrentVersionByPackage,
  cook.evaluateNewVersionByPackage,
  cook.filter('newVersionByPackage', (key, _, { packageJson }) =>
    packageJson.get(key).then((info) => !info.private)
  ),
  cook.byBranch,
  {
    next: cook.remap(
      'newVersionByPackage',
      (_, version) => `${version}-${Date.now()}`
    ),
    canary: cook.remap(
      'newVersionByPackage',
      (_, version) => `${version}-${Date.now()}`
    ),
    otherwise: [],
  },
  cook.writeVersionsToPackages,
  cook.build,
  cook.byBranch,
  {
    master: cook.publishUnderFinalNpmTag('latest'),
    main: cook.publishUnderFinalNpmTag('latest'),
    next: cook.publishUnderFinalNpmTag('next'),
    canary: cook.publishUnderFinalNpmTag('canary'),
    otherwise: [],
  },
  cook.restoreRepository,
  cook.createReleaseNotes('avatar'),
  cook.byBranch,
  {
    master: publishToGithub,
    main: publishToGithub,
    otherwise: [
      ({ git }) => {
        return git.getCurrentBranch().then((branch) => {
          logCommand('skip github release', [], { branch: branch.name })
        })
      },
    ],
  },
  cook.fireworksWithTitle('default release'),
]

export const defaultReleaseSetup = {
  name: 'defaultRelease',
  sequence: defaultReleaseSequence,
}
