/* eslint-env mocha */
import { testAction } from 'test-utils'
import { createReleaseNotes } from './'

const makeCommit = name => {
  const [, type, breaks] = name.split('_')
  return { hash: name, type, breaks: breaks ? ['this that'] : [] }
}

it('run template on release summary', done => {
  const commitsByPackage = [
    {
      name: 'foo',
      commits: [
        'foo_feat_breaks',
        'foo_fix_breaks',
        'foo_feat',
        'foo_fix',
        'foo_chore',
      ].map(makeCommit),
    },
    {
      name: 'bar',
      commits: [
        'bar_feat_breaks',
        'bar_fix_breaks',
        'bar_feat',
        'bar_fix',
        'bar_chore',
      ].map(makeCommit),
    },
  ]
  const newVersionsByPackage = [
    { name: 'bar', version: 'new.bar.version' },
    { name: 'foo', version: 'new.foo.version' },
  ]
  const tag = { name: 'super_awesome_release_tag', date: 'SOME_ISO_DATE' }

  const releaseNotes = Object.assign({ templateRun: 'OK' }, tag, {
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
    breaks: [
      {
        name: 'foo',
        version: 'new.foo.version',
        commits: ['foo_feat_breaks', 'foo_fix_breaks'].map(makeCommit),
      },
      {
        name: 'bar',
        version: 'new.bar.version',
        commits: ['bar_feat_breaks', 'bar_fix_breaks'].map(makeCommit),
      },
    ],
  })
  testAction(
    createReleaseNotes(release =>
      Object.assign({ templateRun: 'OK' }, release)
    ),
    { commitsByPackage, newVersionsByPackage, tag },
    { releaseNotes },
    done
  )
})
