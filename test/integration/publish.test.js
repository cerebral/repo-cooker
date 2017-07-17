/* eslint-env mocha */
import path from 'path'
import request from 'request'
import { Cooker } from 'repo-cooker'
import * as cook from 'repo-cooker/actions'
import { runCommandMock } from 'test-utils'
import simple from 'simple-mock'
import assert from 'test-utils/assert'
import { mockNpmRegistry } from 'test-utils/npm'
import { buildWebsite, publishWebsite } from './actions'

const isoString = '2017-07-09T19:06:31.620Z'

describe('publish script', () => {
  before(() => {
    mockNpmRegistry()
    simple.mock(Date.prototype, 'toISOString').returnWith(isoString)
    simple.mock(request, 'post').callFn(({ url, form }, callback) => {
      callback(
        null,
        { statusCode: 201 },
        JSON.stringify({
          name: form.name,
          tag_name: form.tag_name,
          body: form.body,
          created_at: new Date().toISOString(),
        })
      )
    })
  })
  after(() => {
    simple.restore()
  })

  it('should run a publish script without error', function(done) {
    this.timeout(6000)

    const dryRun = runCommandMock()
    const basePath = path.resolve('test', 'repo')
    const cooker = Cooker({
      devtools: null,
      dryRun,
      path: basePath,
      packagesGlobs: [
        'packages/node_modules/*',
        'packages/node_modules/@repo-cooker-test/*',
        '!packages/node_modules/@repo-cooker-test',
      ],
    })

    const typeToSemver = { feat: 'minor', fix: 'patch' }
    const evaluateSemver = commit =>
      commit.breaks.length ? 'major' : typeToSemver[commit.type]

    const cwd = path.resolve(
      basePath,
      'packages',
      'node_modules',
      '@repo-cooker-test',
      'commis'
    )

    const SCOPES = ['commis']
    const evaluatePackagesFromCommit = commit =>
      SCOPES.indexOf(commit.scope) >= 0
        ? [`@repo-cooker-test/${commit.scope}`]
        : [] /* packageNames */

    const commands = [
      {
        cmd: 'fs.writeFile',
        args: [path.join(cwd, 'package.json'), '[data]', { encoding: 'utf8' }],
      },
      {
        cmd: 'npm',
        args: ['publish', '--tag', 'releasing'],
        options: { cwd },
      },
      {
        cmd: 'npm',
        args: ['dist-tag', 'add', '@repo-cooker-test/commis', 'latest'],
        options: { cwd },
      },
      {
        cmd: 'npm',
        args: ['dist-tag', 'rm', '@repo-cooker-test/commis', 'releasing'],
        options: { cwd },
      },
      {
        cmd: 'resetRepository',
        args: [basePath, 'hard', 'HEAD'],
      },
      {
        cmd: 'createTagForCommit',
        args: [basePath, 'release_2017-07-09_1906', '', 'HEAD'],
      },
      {
        // Due to issues with credentials, it is simpler to just run a
        // git command for this operation.
        cmd: 'git',
        args: ['push', 'origin', 'release_2017-07-09_1906'],
      },
      {
        cmd: 'createRelease',
        args: [
          basePath,
          'release_2017-07-09_1906',
          'some release notes',
          'master',
        ],
      },
    ]

    cooker
      .run([
        cook.getLatestReleaseHash,
        // { hash: "e654cd..." }

        // Get list of commit hashes from `props.hash` to master. If `props.hash` is 'Big Bang', returns
        // the full history up to current master. An invalid hash returns an empty list.
        cook.getHistoryFromHash,
        // { history: ["c456e...", "4d76f..."] }

        // Resolve history list of hash to raw commits.
        cook.getRawCommitsFromHistory,
        // { rawCommits: [{hash, author:{name,email}, message, files}] }
        cook.parseCommits,
        // { commits: [{hash, author, ..., type, scope, summary, issues, breaks, body}]}

        // A factory that takes a mapping function from a commit to
        // a list of package names.
        cook.groupCommitsByPackage(evaluatePackagesFromCommit),
        // {commitsByPackage: [
        //   {name: 'firebase', commits: [{hash: "2424", ...}]},
        //   {name: 'http', commits: [{hash: "2424", ...}]},
        // ]}

        cook.evaluateSemverByPackage(evaluateSemver),
        // Based on parsed commit figure out type of release
        // repo-cooker will automatically use the highest in
        // 'major' > 'minor' > 'patch' > 'noop'
        // {semverByPackage: [
        //   {name: 'firebase', type: 'major'},
        //   {name: 'http', type: 'minor'},
        // ]}

        cook.relatedPackagesByPackage,
        // Returns {relatedPackagesByPackage: {cerebral: ['function-tree']}}
        // This is needed to evaluate change of version bump related to related
        // package update

        cook.getCurrentVersionsByPackage,
        // Go to NPM and grab current version of packages
        // {currentVersionByPackage: [
        //   {name: 'firebase', version: '1.6.0'},
        //   {name: 'http', version: '1.6.4'},
        // ]}

        cook.evaluateNewVersionsByPackage,
        // Based on type of change, use semver bumping
        // {newVersionsByPackage: [
        //   {name: 'firebase', version: '1.6.1'},
        //   {name: 'http', version: '1.7.0'},
        // ]}

        cook.writeVersionToPackages,
        // Just write the new version to package.json of packages
        // this is temporary for release and does not need to be pushed to repo

        cook.publishUnderTemporaryNpmTag,
        // Need to ensure successful release of all packages, so
        // we publish under a temporary tag first
        // {temporaryNpmTagByPackage: [
        //   {name: 'firebase', tag: 'releasing'},
        //   {name: 'http', tag: 'releasing'},
        // }

        cook.mapTemporaryNpmTagToLatest,
        // If successful we just map published tags to official release tag

        cook.resetRepository,
        // Version information is not stored in package.json so we
        // cleanup repo now.

        cook.tagCurrentCommit,
        // Tag current commit with the name format:
        // { tag: {
        //     name: 'release_2018-08-20_0800',
        //     date: '2017-07-09T19:06:31.620Z', // ISO string
        //   }
        // }

        cook.pushTagToRemote,
        // Pushes tag to remote repository

        cook.createReleaseNotes(release => `some release notes`),
        // The `release` object has this format:
        // {
        //   tag: 'release_2017-09-07_0900',
        //   date: '2017-07-09T19:06:31.620Z', // ISO string
        //   fix: [
        //     {
        //       name: 'packageName',
        //       version: 'new.package.version',
        //       commits: [], // see above for commit format
        //     },
        //     {
        //       name: 'otherPackage',
        //       version: 'new.other.version',
        //       commits: [], // see above for commit format
        //     },
        //   ],
        //   feat: [
        //     // same as 'fix'
        //   ],
        //   breaks: [
        //     // same as 'fix'
        //   ],
        // }
        //
        // The action outputs this:
        // { releaseNotes: "Woop woop" }

        cook.createGithubRelease,
        // Send release notes to github on release tag, using name format:
        // Release 2018-08-20 08:00
        // { githubRelease } // See https://developer.github.com/v3/repos/releases/#create-a-release

        buildWebsite,
        // Yeah... you know

        publishWebsite,
        // Jup

        cook.fireworks,
      ])
      .then(() => {
        assert.deepEqual(dryRun.commands, commands, done)
      })
      .catch(done)
  })
})
