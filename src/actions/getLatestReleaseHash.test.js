import * as git from 'isomorphic-git'

import { getLatestReleaseHash } from './'
import { tags } from 'test-utils/commits'
import { testAction } from 'test-utils'

it('should find last tag matching release_', (done) => {
  const hash = tags[tags.length - 1].hash
  testAction(getLatestReleaseHash, {}, { hash }, done)
})

describe('getLatestReleaseHash', () => {
  beforeEach(() => {
    jest.spyOn(git, 'listTags').mockReturnValue([])
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("should return 'Big Bang' for no previous release", (done) => {
    testAction(getLatestReleaseHash, {}, { hash: 'Big Bang' }, done)
  })
})
