import { Cooker } from 'repo-cooker'
import * as cook from 'repo-cooker/actions'
import request from 'request'
import simple from 'simple-mock'
import { runCommandMock } from 'test-utils'
import assert from 'test-utils/assert'
import { mockNpmRegistry } from 'test-utils/npm'

/* eslint-env mocha */
import { join, resolve } from '../../src/helpers/path'
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
    const basePath = resolve('test', 'repo')
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

    const versions = {
      '@repo-cooker-test/commis': '3.0.0-dabd05',
      // '@repo-cooker-test/entremetier': '1.3.4-dabd05', ==> not released
      '@repo-cooker-test/poissonier': '1.0.0-dabd05',
    }
    const released = [
      '@repo-cooker-test/commis',
      // '@repo-cooker-test/entremetier', ==> not release because it is only listed as dev dependency
      '@repo-cooker-test/poissonier',
    ].map(name => ({
      cwd: resolve(basePath, 'packages', 'node_modules', name),
      name,
      version: versions[name],
    }))

    const commands = [
      // No ... because we want to sort them to avoid inconsistent test failures.
      released.map(r => ({
        cmd: 'writeFile',
        args: [join(r.cwd, 'package.json'), '[data]', { encoding: 'utf8' }],
      })),
      ...released.map(r => ({
        cmd: 'npm',
        args: ['publish', '--tag', 'releasing', '--access', 'public'],
        options: { cwd: r.cwd, pause: true },
      })),
      ...released.map(r => ({
        cmd: 'npm',
        args: ['dist-tag', 'add', `${r.name}@${r.version}`, 'next'],
        options: { cwd: r.cwd, pause: true },
      })),
      ...released.map(r => ({
        cmd: 'npm',
        args: ['dist-tag', 'rm', r.name, 'releasing'],
        options: { cwd: r.cwd },
      })),
      {
        cmd: 'resetRepository',
        args: [basePath, 'hard', 'HEAD'],
      },
      {
        cmd: 'createTagForCommit',
        args: [basePath, 'v2017-07-09_1906', '', 'HEAD'],
      },
      {
        // Due to issues with credentials, it is simpler to just run a
        // git command for this operation.
        cmd: 'git',
        args: ['push', 'origin', 'v2017-07-09_1906'],
      },
      {
        cmd: 'createRelease',
        args: [basePath, 'v2017-07-09_1906', 'some release notes', 'master'],
      },
    ]

    // Normal usage would use cooker.cook() because this catches and displays
    // errors.
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

        // Groups commits by matching files changed by defined packages paths
        cook.groupCommitsByPackage,
        // {commitsByPackage: {
        //   'firebase': [{hash: "2424", ...}],
        //   'http': [{hash: "2424", ...}]
        // }

        cook.evaluateSemverByPackage,
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

        cook.getCurrentVersionByPackage,
        // Go to NPM and grab current version of packages
        // {currentVersionByPackage: {
        //   'firebase': '1.6.0',
        //   'http': '1.6.4',
        // }}

        cook.evaluateNewVersionByPackage,
        // Based on type of change, use semver bumping
        // {newVersionByPackage: {
        //   'firebase': '1.6.1',
        //   'http': '1.7.0',
        // }}

        cook.remap(
          'newVersionByPackage',
          (_, version, { props }) => `${version}-${props.hash.slice(0, 6)}`
        ),

        cook.writeVersionsToPackages,
        // Just write the new version to package.json of packages
        // this is temporary for release and does not need to be pushed to repo

        cook.runNpmScript('prepare'),
        // Run the `prepare` script in all packages if it exists. The `npm publish`
        // script also runs them but we want to make sure none fail before moving
        // forward.

        cook.publishUnderTemporaryNpmTag,
        // Needs npm to be logged in:
        // > npm login
        //
        // Need to ensure successful release of all packages, so
        // we publish under a temporary tag first
        // {temporaryNpmTagByPackage: [
        //   {name: 'firebase', tag: 'releasing'},
        //   {name: 'http', tag: 'releasing'},
        // }

        cook.mapTemporaryNpmTagTo('next'),
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
        // Needs a REPO_COOKER_GITHUB_TOKEN in ENV. Get one from
        // https://github.com/settings/tokens
        //
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
        const result = []
        let writtenFiles
        dryRun.commands.forEach(cmd => {
          if (cmd.cmd === 'writeFile') {
            if (writtenFiles === undefined) {
              writtenFiles = []
              result.push(writtenFiles)
            }
            writtenFiles.push(cmd)
          } else {
            result.push(cmd)
          }
        })
        writtenFiles.sort((a, b) => (a.args[0] < b.args[0] ? -1 : 1))
        assert.deepEqual(result, commands, done)
      })
      .catch(done)
  })
})
