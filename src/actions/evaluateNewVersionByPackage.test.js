import { testAction, testActionThrows } from 'test-utils'

import { evaluateNewVersionByPackage } from './'

const relatedPackagesByPackage = {
  package0: [],
  package1: [],
  package2: [],
  package3: [],
  package4: [],
  package5: ['package7'],
  package6: [],
  package7: ['package1'],
}
const tests = [
  { current: '0.3.9', type: 'minor', version: '0.4.0' },
  { current: '0.3.9', type: 'major', version: '1.0.0' },
  { current: '1.2.3', type: 'patch', version: '1.2.4' },
  { current: '1.2.3', type: 'minor', version: '1.3.0' },
  { current: '0.3.9-beta9', type: 'patch', version: '0.3.10' },
  { current: '0.3.9-34', type: undefined, version: '1.0.0' }, // no own changes
  { current: '0.3.9.cd3f34', type: 'patch', version: '0.3.10' },
  { current: '1.2.3', type: 'major', version: '2.0.0' },
].reduce(
  (acc, { current, type, version }, idx) => {
    const name = `package${idx}`
    acc.currentVersionByPackage[name] = current
    acc.semverByPackage[name] = type
    acc.newVersionByPackage[name] = version

    return acc
  },
  {
    currentVersionByPackage: {},
    semverByPackage: {},
    newVersionByPackage: {},
    relatedPackagesByPackage,
  }
)

describe('evaluateNewVersionByPackage', () => {
  it('should evalute new version from current and semver', (done) => {
    testAction(
      evaluateNewVersionByPackage,
      {
        currentVersionByPackage: tests.currentVersionByPackage,
        semverByPackage: tests.semverByPackage,
        relatedPackagesByPackage: tests.relatedPackagesByPackage,
      },
      { newVersionByPackage: tests.newVersionByPackage },
      done
    )
  })

  it('should throw error on invalid current version', (testDone) => {
    const done = (error) => (error ? testDone(error) : () => {})
    ;['2.f.0-beta', '1.2b.4', 'ea2356'].forEach((version) =>
      testActionThrows(
        evaluateNewVersionByPackage,
        {
          currentVersionByPackage: { foo: version },
          semverByPackage: { foo: 'major' },
          relatedPackagesByPackage: { foo: [] },
        },
        `Invalid version '${version}' for package 'foo' (format should be '[integer].[integer].[integer][anything]').`,
        done
      )
    )
    testDone()
  })

  it('should throw errors on invalid semver type', (done) => {
    testActionThrows(
      evaluateNewVersionByPackage,
      {
        currentVersionByPackage: { foo: '0.4.5' },
        semverByPackage: { foo: 'noop' },
        relatedPackagesByPackage: { foo: [] },
      },
      `Invalid semver type 'noop' for package 'foo'.`,
      done
    )
  })

  it('should evaluate to 1.0.0 when no current version available', (done) => {
    testAction(
      evaluateNewVersionByPackage,
      {
        currentVersionByPackage: { foo: null },
        semverByPackage: { foo: 'noop' },
        relatedPackagesByPackage: { foo: [] },
      },
      { newVersionByPackage: { foo: '1.0.0' } },
      done
    )
  })
})
