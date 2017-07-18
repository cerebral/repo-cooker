/* eslint-env mocha */
import { testAction } from 'test-utils'
import { evaluateSemverByPackage } from './'

const commitsByPackage = {
  foo: [{ type: 'fix', breaks: [] }],
  bar: [{ type: 'feat', breaks: [] }],
  noop: [{ type: 'noop', breaks: [] }],
  baz: [
    { type: 'fix', breaks: [] },
    { type: 'feat', breaks: [] },
    { type: 'fix', breaks: ['x'] },
  ],
}

const semverByPackage = {
  foo: 'patch',
  bar: 'minor',
  baz: 'major',
}

it('should run the grouping function for every commit and group commits', done => {
  testAction(
    evaluateSemverByPackage,
    { commitsByPackage },
    { semverByPackage },
    done
  )
})
