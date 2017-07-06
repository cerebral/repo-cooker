/* eslint-env mocha */
import { Cooker } from '../../src'
import * as cook from '../../src/actions'
import path from 'path'
import { buildWebsite, publishWebsite } from './actions'

it('should publish a repo', function(done) {
  this.timeout(60000)

  const cooker = Cooker({
    path: path.resolve('test', 'repo'),
  })
  const execution = [
    cook.getLatestReleaseHash,
    // { hash: "r1084082" }
    cook.getHistoryFromHash,
    // { history: ["22048204", "41084224"] }
    cook.getRawCommitsFromHistory,
    // { rawCommits: [{hash, author:{name,email}, message, files}] }

    cook.parseCommits,
    // { commits: [{hash, author, ..., type, scope, summary, issues, breaks, body}]}

    // A factory that takes a mapping function
    cook.groupCommitsByPackage(commit => 'foo' /* packageName */),
    /*
    {
      commitsByPackage: [
        {name: 'firebase', commits: [{hash: "2424", ...}]},
        {name: 'http', commits: [{hash: "2424", ...}]},
      ]
    }
  */

    cook.evaluateSemverByPackage(commit => 'major'),
    // Based on parsed commit figure out type of release
    // repo-cooker will automatically use the highest in
    // 'major' > 'minor' > 'patch' > 'noop'
    /*
    {
      semverByPackage: [
        {name: 'firebase', type: 'major'},
        {name: 'http', type: 'minor'},
      ]
    }
  */

    cook.getCurrentVersionByPackage,
    // Go to NPM and grab current version of packages
    /*
    {
      currentVersionByPackage: [
        {name: 'firebase', version: '1.6.0'},
        {name: 'http', version: '1.6.4'},
      ]
    }
  */

    cook.evaluateNewVersionByPackage,
    // Based on type of change, use semver bumping
    /*
    {
      newVersionByPackage: [
        {name: 'firebase', version: '1.6.1'},
        {name: 'http', version: '1.7.0'},
      ]
    }
  */

    cook.writeVersionToPackages,
    // Just write the new version to package.json of packages
    // this is temporary for release and does not need to be pushed to repo

    cook.publishUnderTemporaryNpmTag,
    // Need to ensure successful release of all packages, so
    // we publish under a temporary tag first

    cook.mapTemporaryTagToLatest,
    // If successful we just map published tags to official release tag

    cook.cleanWorkingDirectory,
    // Clean up our mess

    cook.tagCurrentCommit,
    // Talk to github to tag current commit with the name format:
    // release_2018-08-20_0800

    cook.pushTagToRepo,
    // Self explanatory :)

    cook.createReleaseNotes,
    // Based on parsed information create release notes
    // by packages and type of changes
    // { releaseNotes: "Woop woop" }

    cook.updateGithubWithReleaseNotes,
    // Send release notes to github on release tag, using name format:
    // Release 2018-08-20 08:00

    buildWebsite,
    // Yeah... you know

    publishWebsite,
    // Jup

    cook.fireworks,
  ]

  cooker.run(execution).then(done).catch(done)
})
