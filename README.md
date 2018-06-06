[![Build status][travis-image]][travis-url]

## GETTING READY

Things to check before gettings started:

1. Monorepo has correct 'repository' entry in package.json
2. Names in individual packages package.json file is correct (matches glob path). For example, a package in 'packages/@foo/bar' should have '@foo/bar' as name.
3. REPO_COOKER_GITHUB_TOKEN is set in the environment where the script runs.
4. .npmrc has an authToken (npm login).
5. git login if publishing release (see .travis.yml as example)
6. 'latest' npm tag for packages already released use a semver version matching /^\d+.\d+\.
  (any version with appe)

## Suggested public API

*package.json*
```json
{
  "scripts": {
    // This will run the custom script in ./repo-cooker/publish.js
    "publish": "repo-cooker publish",
    // As there is no custom script for `test`, this will run the npm script 'test' in
    // all packages.
    "test": "repo-cooker test"
  }
}
```

*repo-cooker/index.js*

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

  // If your repo is located at some path other than
  // project root
  path: '.',

  // Additional providers for the actions
  providers: []

  // For monorepo repositories with multiple packages, specify
  // the subpath to each package. A package should
  // then be in [path]/[packagesPath]/[packageName]
  packagesPath: 'packages/node_modules'
})
```

*repo-cooker/publish.js*
```js
import {cooker} from './'

cooker.cook('publish', [
  cook.getLatestReleaseHash,
  cook.getHistoryFromHash,
  // ... and so on
  cook.fireworks,
])
```

For now look at [publish.test.js](https://github.com/cerebral/repo-cooker/blob/master/test/integration/publish.test.js)
for a full example with comments.

[travis-image]: https://img.shields.io/travis/cerebral/repo-cooker.svg?style=flat
[travis-url]: https://travis-ci.org/cerebral/repo-cooker