# repo-cooker

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

This is a tool for monorepo management and publishing, now with vscode
extension support !

Repo-cooker helps running commands in all projects, linking binaries to run
commands in directories and supports auto-semver versionning based on commits
since last release (commitizen type).

There is no pre-required monorepo style or folder structure.

## GETTING READY

Things to check before gettings started:

1.  Monorepo has correct 'repository' entry in package.json
2.  Names in individual packages package.json file is correct (matches glob path). For example, a package in 'packages/@foo/bar' should have '@foo/bar' as name.
3.  REPO_COOKER_GITHUB_TOKEN is set in the environment where the script runs.
4.  .npmrc has an authToken (npm login).
5.  git login if publishing release (see .travis.yml as example)
6.  'latest' npm tag for packages already released use a semver version matching /^\d+.\d+\.
    (any version with appe)

## Usage examples

_package.json_

```js
{
  "scripts": {
    // Create a symlink in every package to the '.bin' folder
    // in root node_modules (to run commands from inside the
    // packages).
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

_repo-cooker/index.js_

This is the settings file.

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

_repo-cooker/publish.js_

```js
import { cooker } from './'

cooker.cook('publish', [
  cook.getLatestReleaseHash,
  cook.getHistoryFromHash,
  // ... and so on
  cook.fireworks
])
```

For now look at [publish.test.js](https://github.com/cerebral/repo-cooker/blob/master/test/integration/publish.test.js)
for a full example with comments.

[npm-image]: https://img.shields.io/npm/v/repo-cooker.svg?style=flat
[npm-url]: https://npmjs.org/package/repo-cooker
[travis-image]: https://img.shields.io/travis/cerebral/repo-cooker.svg?style=flat
[travis-url]: https://travis-ci.org/cerebral/repo-cooker
