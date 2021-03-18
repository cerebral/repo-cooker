/* eslint-env mocha */
import { testAction } from 'test-utils'
import { createReleaseNotes } from './'

const makeCommit = name => {
  const [, type, breaks] = name.split('_')
  return { hash: name, type, breaks: breaks ? ['this that'] : [] }
}

it('should run template on release summary', done => {
  const commits = [
    'foo_feat_breaks',
    'foo_fix_breaks',
    'foo_feat',
    'foo_fix',
    'foo_chore',
    'bar_feat_breaks',
    'bar_fix_breaks',
    'bar_feat',
    'bar_fix',
    'bar_chore',
  ].map(makeCommit)
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
      commits,
      commitsByType: {
        chore: commits.filter(c => c.type === 'chore'),
        feat: commits.filter(c => c.type === 'feat'),
        fix: commits.filter(c => c.type === 'fix'),
      },
      summary: {
        chore: [
          {
            name: 'foo',
            version: 'new.foo.version',
            commits: ['foo_chore'].map(makeCommit),
          },
          {
            name: 'bar',
            version: 'new.bar.version',
            commits: ['bar_chore'].map(makeCommit),
          },
        ],
        feat: [
          {
            name: 'foo',
            version: 'new.foo.version',
            commits: ['foo_feat_breaks', 'foo_feat'].map(makeCommit),
          },
          {
            name: 'bar',
            version: 'new.bar.version',
            commits: ['bar_feat_breaks', 'bar_feat'].map(makeCommit),
          },
        ],
        fix: [
          {
            name: 'foo',
            version: 'new.foo.version',
            commits: ['foo_fix_breaks', 'foo_fix'].map(makeCommit),
          },
          {
            name: 'bar',
            version: 'new.bar.version',
            commits: ['bar_fix_breaks', 'bar_fix'].map(makeCommit),
          },
        ],
      },
    }
  )

  testAction(
    (...args) => ({
      releaseNotes: JSON.parse(
        createReleaseNotes(release =>
          JSON.stringify(Object.assign({ templateRun: 'OK' }, release))
        )(...args).releaseNotes
      ),
    }),
    {
      commits,
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
