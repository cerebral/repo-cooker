import * as cook from '../actions'

export const simpleReleaseSignal = [
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
  cook.writeVersionsToPackages,
  cook.runNpmScript('prepublish'),
  cook.publishUnderTemporaryNpmTag,
  cook.byBranch,
  {
    master: cook.mapTemporaryNpmTagTo('latest'),
    otherwise: [],
  },
  cook.resetRepository,
  cook.createReleaseNotes('simple'),
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
  cook.fireworksWithTitle('simple release'),
]

export const simpleReleaseSetup = {
  signal: simpleReleaseSignal,
}
