# repo-cooker

[![NPM version][npm-image]][npm-url]
[![Test status][gh-actions-test-image]][gh-actions-url]
[![Release status][gh-actions-release-image]][gh-actions-url]

This is a tool for monorepo management and publishing.

Repo-cooker helps running commands in all projects, linking binaries to run
commands in directories and supports auto-semver versioning based on commits
since last release (commitizen type).

There is no pre-required monorepo style or folder structure.

## GETTING READY

Things to check before gettings started:

1. Monorepo has correct 'repository' entry in package.json
2. Names in individual packages package.json file is correct (matches glob path). For example, a package in 'packages/@foo/bar' should have '@foo/bar' as name.
3. REPO_COOKER_GITHUB_TOKEN is set in the environment where the script runs.
4. .npmrc has an authToken (npm login) and REPO_COOKER_NPM_OTP is set if you have two factor authentication
5. git login if publishing release (see `.github/workflows/release.yml` as example)
6. 'latest' npm tag for packages already released use a semver version matching `/^\d+\.\d+\.\d+$/`.

## Usage examples

### `package.json`

```js
{
  "scripts": {
    // Creates a symlink from /[package path]/node-modules/.bin --> /node_modules/.bin
    // Creates a symlink from /node_modules/[package-name] --> [package path]
    "link": "repo-cooker --link",
    // Link on npm install.
    "install": "npm run link",
    // Build all modules, respecting cross-dependencies.
    "build": "repo-cooker --build",
    // Run the default release (semver, npm, github release)
    "release": "repo-cooker --release",
    "release:preview": "repo-cooker --dry-run --release --print-release",
    // Run the "test" script in all packages (if available).
    "test": "repo-cooker test"
    // If there is a ./repo-cooker/doThis.js file, run this
    // custom script otherwise, run the "doThis" script from
    // all packages.
    "doThis": "repo-cooker doThis",
  }
}
```

### `repo-cooker/index.js`

This is the configuration file. Allowed extensions are `.js`, `.mjs` and `.cjs`.

```js
import {Cooker} from 'repo-cooker'

// We need to pass process.argv as first argument so that we can set
// --dry-run or other options. For example:
// > npm run publish -- --dry-run
const cooker = Cooker(process.argv, {
  // Devtools settings
  devtools: {
    host: 'localhost:9797'
  },

  // Use devtools.
  // Same as command line option '--devtools'.
  useDevtools: true,

  // Do not execute any command, just show what would be run.
  // Same as command line option '--dry-run'.
  dryRun: true,

  // If your repo is located at some path other than
  // project root.
  path: '.',

  // Additional providers for the actions
  providers: []

  // For monorepo repositories with multiple packages, specify
  // the subpath to each package. A package should
  // then be in [path]/[packagesPath]/[packageName]
  packagesPath: 'packages/node_modules'
})
```

### `repo-cooker/publish.js`

```js
import { cooker } from './'

cooker.cook('publish', [
  cook.getLatestReleaseHash,
  cook.getHistoryFromHash,
  // ... and so on
  cook.fireworks
])
```

For now look at [publish.test.js](https://github.com/cerebral/repo-cooker/blob/main/test/integration/publish.test.js)
for a full example with comments.

[npm-image]: https://img.shields.io/npm/v/repo-cooker.svg?style=flat
[npm-url]: https://npmjs.org/package/repo-cooker
[gh-actions-test-image]: https://github.com/cerebral/repo-cooker/actions/workflows/test.yml/badge.svg
[gh-actions-release-image]: https://github.com/cerebral/repo-cooker/actions/workflows/release.yml/badge.svg
[gh-actions-url]: https://github.com/cerebral/repo-cooker/actions
