/* eslint-env mocha */
import { testAction, testActionThrows } from 'test-utils'
import { evaluateNewVersionsByPackage } from './'

const tests = [
  { current: '0.3.9', type: 'patch', version: '0.3.10' },
  { current: '0.3.9', type: 'minor', version: '0.4.0' },
  { current: '0.3.9', type: 'major', version: '1.0.0' },
  { current: '1.2.3', type: 'patch', version: '1.2.4' },
  { current: '1.2.3', type: 'minor', version: '1.3.0' },
  { current: '1.2.3', type: 'major', version: '2.0.0' },
].reduce(
  (acc, { current, type, version }, idx) => {
    const name = `package${idx}`
    acc.currentVersionsByPackage.push({ name, version: current })
    acc.semverByPackage.push({ name, type })
    acc.newVersionsByPackage.push({ name, version })
    return acc
  },
  {
    currentVersionsByPackage: [],
    semverByPackage: [],
    newVersionsByPackage: [],
  }
)

it('should evalute new version from current and semver', done => {
  testAction(
    evaluateNewVersionsByPackage,
    {
      currentVersionsByPackage: tests.currentVersionsByPackage,
      semverByPackage: tests.semverByPackage,
    },
    { newVersionsByPackage: tests.newVersionsByPackage },
    done
  )
})

it('should throw errors on invalid current version', testDone => {
  const done = error => (error ? testDone(error) : () => {})
  ;['2.0.0-beta', '4.5.6.7', '1.2.3b', 'ea2356'].forEach(version => {
    testActionThrows(
      evaluateNewVersionsByPackage,
      {
        currentVersionsByPackage: [{ name: 'foo', version }],
        semverByPackage: [{ name: 'foo', type: 'major' }],
      },
      `Invalid version '${version}' for package 'foo' (format should be '[integer].[integer].[integer]').`,
      done
    )
  })
  testDone()
})

it('should throw errors on invalid semver type', done => {
  testActionThrows(
    evaluateNewVersionsByPackage,
    {
      currentVersionsByPackage: [{ name: 'foo', version: '0.4.5' }],
      semverByPackage: [{ name: 'foo', type: 'noop' }],
    },
    `Invalid semver type 'noop' for package 'foo'.`,
    done
  )
})
