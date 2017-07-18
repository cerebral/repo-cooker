/* eslint-env mocha */
import { testAction, testActionThrows } from 'test-utils'
import { evaluateNewVersionsByPackage } from './'

const relatedPackagesByPackage = {
  dependedOn: {
    package0: [],
    package1: [],
    package2: [],
    package3: [],
    package4: [],
    package5: ['package1'],
  },
  dependedBy: {
    package0: [],
    package1: ['package5'],
    package2: [],
    package3: [],
    package4: [],
    package5: [],
  },
}
const tests = [
  { current: '0.3.9', type: 'minor', version: '0.4.0' },
  { current: '0.3.9', type: 'major', version: '1.0.0' },
  { current: '1.2.3', type: 'patch', version: '1.2.4' },
  { current: '1.2.3', type: 'minor', version: '1.3.0' },
  { current: '1.2.3', type: 'major', version: '2.0.0' },
  { current: '0.3.9', type: 'patch', version: '1.0.0' },
].reduce(
  (acc, { current, type, version }, idx) => {
    const name = `package${idx}`
    acc.currentVersionsByPackage[name] = current
    acc.semverByPackage[name] = type
    acc.newVersionsByPackage[name] = version

    return acc
  },
  {
    currentVersionsByPackage: {},
    semverByPackage: {},
    newVersionsByPackage: {},
    relatedPackagesByPackage,
  }
)

describe('evaluateNewVersionsByPackage', () => {
  it('should evalute new version from current and semver', done => {
    testAction(
      evaluateNewVersionsByPackage,
      {
        currentVersionsByPackage: tests.currentVersionsByPackage,
        semverByPackage: tests.semverByPackage,
        relatedPackagesByPackage: tests.relatedPackagesByPackage,
      },
      { newVersionsByPackage: tests.newVersionsByPackage },
      done
    )
  })

  it('should throw errors on invalid current version', testDone => {
    const done = error =>
      (error ? testDone(error) : () => {})[
        ('2.0.0-beta', '4.5.6.7', '1.2.3b', 'ea2356')
      ].forEach(version => {
        testActionThrows(
          evaluateNewVersionsByPackage,
          {
            currentVersionsByPackage: [{ name: 'foo', version }],
            semverByPackage: [{ name: 'foo', type: 'major' }],
            relatedPackagesByPackage: { foo: [] },
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
        currentVersionsByPackage: { foo: '0.4.5' },
        semverByPackage: { foo: 'noop' },
        relatedPackagesByPackage: {
          dependedOn: { foo: [] },
          dependedBy: { foo: [] },
        },
      },
      `Invalid semver type 'noop' for package 'foo'.`,
      done
    )
  })
})
