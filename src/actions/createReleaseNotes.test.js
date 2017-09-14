/* eslint-env mocha */
import { testAction } from 'test-utils'
import { createReleaseNotes } from './'

const makeCommit = name => {
  const [, type, breaks] = name.split('_')
  return { hash: name, type, breaks: breaks ? ['this that'] : [] }
}

it('run template on release summary', done => {
  const commitsByPackage = {
    foo: [
      'foo_feat_breaks',
      'foo_fix_breaks',
      'foo_feat',
      'foo_fix',
      'foo_chore',
    ].map(makeCommit),
    bar: [
      'bar_feat_breaks',
      'bar_fix_breaks',
      'bar_feat',
      'bar_fix',
      'bar_chore',
    ].map(makeCommit),
  }
  const currentVersionByPackage = {
    bar: 'current.bar.version',
    foo: 'current.foo.version',
  }
  const newVersionByPackage = {
    bar: 'new.bar.version',
    foo: 'new.foo.version',
  }
  const commitsWithoutPackage = []
  const tag = { name: 'super_awesome_release_tag', date: 'SOME_ISO_DATE' }

  const releaseNotes = Object.assign(
    { templateRun: 'OK', tag },
    {
      newVersionByPackage,
      currentVersionByPackage,
      commitsWithoutPackage,
      summary: {
        chore: [
          {
            name: 'foo',
            commits: ['foo_chore'].map(makeCommit),
          },
          {
            name: 'bar',
            commits: ['bar_chore'].map(makeCommit),
          },
        ],
        feat: [
          {
            name: 'foo',
            commits: ['foo_feat_breaks', 'foo_feat'].map(makeCommit),
          },
          {
            name: 'bar',
            commits: ['bar_feat_breaks', 'bar_feat'].map(makeCommit),
          },
        ],
        fix: [
          {
            name: 'foo',
            commits: ['foo_fix_breaks', 'foo_fix'].map(makeCommit),
          },
          {
            name: 'bar',
            commits: ['bar_fix_breaks', 'bar_fix'].map(makeCommit),
          },
        ],
      },
    }
  )

  testAction(
    createReleaseNotes(release =>
      Object.assign({ templateRun: 'OK' }, release)
    ),
    {
      commitsByPackage,
      currentVersionByPackage,
      newVersionByPackage,
      commitsWithoutPackage,
      tag,
    },
    { releaseNotes },
    done
  )
})
