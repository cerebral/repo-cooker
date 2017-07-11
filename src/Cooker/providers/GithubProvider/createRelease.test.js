/* eslint-env mocha */
import request from 'request'
import simple from 'simple-mock'
import { config } from 'test-utils'
import assert from 'test-utils/assert'
import { createRelease } from './createRelease'

describe('createRelease', () => {
  const release = {
    name: 'release_THIS_THAT',
    tag_name: 'release_THIS_THAT',
    body: 'Markdown description of release content.',
    created_at: new Date().toISOString(),
  }

  before(() => {
    simple.mock(request, 'post').callFn(({ url, form }, callback) => {
      callback(
        null,
        { statusCode: 201 },
        JSON.stringify({
          name: form.name,
          tag_name: form.tag_name,
          body: form.body,
          created_at: release.created_at,
        })
      )
    })
  })

  after(() => simple.restore())

  it('publish release to github', function(done) {
    createRelease(config.path, release.name, release.body)
      .then(response => {
        assert.deepEqual(release, response, done)
      })
      .catch(done)
  })
})
