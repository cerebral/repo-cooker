import * as cook from '../actions'

export const defaultReleaseSignal = [
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
  cook.runNpmScript('prepublish'),
  cook.publishUnderTemporaryNpmTag,
  cook.byBranch,
  {
    master: cook.mapTemporaryNpmTagTo('latest'),
    next: cook.mapTemporaryNpmTagTo('next'),
    canary: cook.mapTemporaryNpmTagTo('canary'),
    otherwise: [],
  },
  cook.resetRepository,
  cook.createReleaseNotes('avatar'),
  cook.byBranch,
  {
    master: [
      cook.tagCurrentCommit,
      cook.pushTagToRemote,
      cook.byReleaseTarget,
      {
        github: cook.createGithubRelease,
      },
    ],
    otherwise: [],
  },
  cook.fireworksWithTitle('default release'),
]

export const defaultReleaseSetup = {
  signal: defaultReleaseSignal,
}
