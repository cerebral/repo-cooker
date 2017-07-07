## Suggested public API

*package.json*
```json
{
  "scripts": {
    "publish": "node publish-script.js"
  }
}
```

*publish-script.js*
```js
import {Cooker} from 'repo-cooker'
import * as cook from 'repo-cooker/actions'

const cooker = Cooker({
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

cooker.run('publish', [
  cook.getLatestReleaseHash,
  cook.getHistoryFromHash,
  // ... and so on
  cook.fireworks,
])
```

For now look at [publish.test.js](https://github.com/cerebral/repo-cooker/blob/master/test/integration/publish.test.js)
for a full example with comments.
