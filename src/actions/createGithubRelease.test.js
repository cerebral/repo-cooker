/* eslint-env mocha */
import { config, testAction } from 'test-utils'
import { createGithubRelease } from './'

it('should post new release to github', done => {
  const releaseNotes = 'Some markdown to describe release.'
  const tag = { name: 'release_2017-07-11_1103' }
  const commands = [
    {
      cmd: 'createRelease',
      args: [config.path, tag.name, releaseNotes, 'master'],
    },
  ]
  testAction(createGithubRelease, { releaseNotes, tag }, { commands }, done)
})
