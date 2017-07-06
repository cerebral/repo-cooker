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
import {getLatestReleaseHash, getHistoryFromHash, getCommitsContent} from 'repo-cooker/actions'

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
})

cooker.run('publish', [
  getLatestReleaseHash,
  getHistoryFromHash,
  getCommitsContent
  ... and so on
])
```

## Cerebral requirements
```js
function getLatestReleaseHash () {
    // Find tag by "release_" format in local git
  },
  // { hash: "r1084082" }

  function getHistoryFromHash() {
    // Get list of commit hashes after latest release hash in local git
  },
  // { commits: ["22048204", "41084224"] }

  function getCommitsContent () {
    // Extract raw data about each commit
  },
  // { commitContents: [{hash: "24242", message: "", diff: "", author: ""}, {...}] }

  function parseCommitsContentToHistory () {
     /*
      Use parser to figure out details about each commit in this format:
      {
        type: "FEATURE", // "CHORE", "FIX", ""
        hash: "242",
        isBreaking: false,
        files: [],
        message: "",
        author: "",
        date: ""
      }
    */
  },
  // { history: [{type: "BREAKING", }, {...}] }

  // A factory that takes a reducer
  groupHistoryByPackage((historyByPackage, historyRecord) => {
    // Put history record in relevant packages based on file paths
    return historyByPackage
  }),
  /*
    {
      historyByPackage: [
        {name: 'firebase', commits: [{hash: "2424", ...}]},
        {name: 'http', commits: [{hash: "2424", ...}]},
      ]
    }
  */

  function evaluateSemverByPackage () {
    // Based on parsed commit figure out type of release
  },
  /*
    {
      semverByPackage: [
        {name: 'firebase', type: 'major'},
        {name: 'http', type: 'minor'},
      ]
    }
  */

  function getCurrentVersionByPackage () {
    // Go to NPM and grab current version of packages
  },
  /*
    {
      currentVersionByPackage: [
        {name: 'firebase', version: '1.6.0'},
        {name: 'http', version: '1.6.4'},
      ]
    }
  */

  function evaluateNewVersionByPackage () {
    // Based on type of change, use semver bumping
  },
  /*
    {
      newVersionByPackage: [
        {name: 'firebase', version: '1.6.1'},
        {name: 'http', version: '1.7.0'},
      ]
    }
  */

  function writeVersionToPackages () {
    // Just write the new version to package.json of packages
   // this is temporary for release and does not need to be pushed to repo
  },

  function publishUnderTemporaryNpmTag () {
    // Need to ensure successful release of all packages, so
   // we publish under a temporary tag first
  },

  function mapTemporaryTagToLatest () {
    // If successful we just map published tags to official release tag
  },

  function cleanWorkingDirectory () {
    // Clean up our mess
  },

  function tagCurrentCommit () {
    // Talk to github to tag current commit with the name format:
   // release_2018-08-20_0800
  },

  function pushTagToRepo () {
    // Self explanatory :)
  },

  function createReleaseNotes () {
    // Based on parsed information create release notes
    // by packages and type of changes
  },
  // { releaseNotes: "Woop woop" }    

  function updateGithubWithReleaseNotes () {
    // Send release notes to github on release tag, using name format:
    // Release 2018-08-20 08:00
  },

  function buildWebsite () {
    // Yeah... you know
  },

  function publishWebsite () {
    // Jup
  },

  fireworks
]
```
