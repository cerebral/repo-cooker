/* eslint-env jest */
import MockAdapter from 'axios-mock-adapter'
import assert from 'test-utils/assert'
import axios from 'axios'
import { config } from 'test-utils'
import { createRelease } from './createRelease'

describe('createRelease', () => {
  let mock
  const release = {
    name: 'release_THIS_THAT',
    tag_name: 'release_THIS_THAT',
    body: 'Markdown description of release content.',
    created_at: new Date().toISOString(),
  }
  const url = 'https://api.github.com/repos/cerebral/repo-cooker-test/releases'

  beforeAll(() => {
    mock = new MockAdapter(axios)
    mock.onPost(url).reply(201, release)
  })
  afterAll(() => {
    mock.restore()
  })

  it('should publish release to github', async () => {
    const result = await createRelease(config.path, release.name, release.body)

    expect(mock.history.post[0].url).toEqual(url)
    assert.deepEqual(result, release)
  })
})
