/* eslint-env jest */
import assert from 'test-utils/assert'
import { config } from 'test-utils'
import { createRelease } from './createRelease'
import request from 'request'
import simple from 'simple-mock'

describe('createRelease', () => {
  const release = {
    name: 'release_THIS_THAT',
    tag_name: 'release_THIS_THAT',
    body: 'Markdown description of release content.',
    created_at: new Date().toISOString(),
  }

  beforeAll(() => {
    simple.mock(request, 'post').callFn(({ url, body }, callback) => {
      const data = JSON.parse(body)
      callback(
        null,
        { statusCode: 201 },
        JSON.stringify({
          name: data.name,
          tag_name: data.tag_name,
          body: data.body,
          created_at: release.created_at,
        })
      )
    })
  })

  afterAll(() => simple.restore())

  it('should publish release to github', done => {
    createRelease(config.path, release.name, release.body)
      .then(response => {
        assert.deepEqual(response, release, done)
      })
      .catch(done)
  })
})
