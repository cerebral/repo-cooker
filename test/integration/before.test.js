/* eslint-env mocha */
import { config } from 'test-utils'
import { current, commits as testCommits } from 'test-utils/commits'
import { Cooker } from 'repo-cooker'
import * as cook from 'repo-cooker/actions'

before(done => {
  const cooker = Cooker([], Object.assign({}, config, { dryRun: true }))
  cooker
    .run([
      () => ({ hash: 'Big Bang' }),
      cook.getHistoryFromHash,
      cook.getRawCommitsFromHistory,
      cook.parseCommits,
      ({ props: { rawCommits, commits } }) => {
        const head = commits[commits.length - 1].hash
        if (current !== head) {
          console.log(
            "\n\nNEW commits, please update 'test/utils/commits.js' file with:\n"
          )
          console.log(`CURRENT: ${head}\n`)
          const newCommits = JSON.stringify(
            rawCommits.slice(testCommits.length),
            null,
            2
          )
          console.log(`NEW COMMITS: \n${newCommits}\n`)
          const newParsedCommits = JSON.stringify(
            commits.slice(testCommits.length),
            null,
            2
          )
          console.log(`PARSED COMMITS: \n${newParsedCommits}\n`)
          process.exit(-1)
        }
        done()
      },
    ])
    .catch(error => {
      console.log(error)
      done(error)
    })
})
