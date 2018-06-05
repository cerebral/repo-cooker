/* eslint-env mocha */
import { join } from 'path'
import { config, testAction } from 'test-utils'
import { versions } from 'test-utils/npm'
import { writeVersionsToPackages } from './'

describe('writeVersionsToPackages', () => {
  const written = []
  const dryRun = (cmd, args) => {
    written.push(Object.assign({ path: args[0] }, JSON.parse(args[1])))
    written.sort((a, b) => (a.path < b.path ? -1 : 1))
  }

  it('should write other versions in package.json', done => {
    const currentVersionByPackage = versions
    const newVersionByPackage = {
      '@repo-cooker-test/commis': '4.5.6',
      '@repo-cooker-test/poissonier': '1.2.3',
      '@repo-cooker-test/entremetier': '2.3.4',
      '@repo-cooker-test/pastry-chef': '5.3.4',
    }
    const writtenContent = [
      {
        path: join(
          config.packagesPaths['@repo-cooker-test/commis'],
          'package.json'
        ),
        name: '@repo-cooker-test/commis',
        license: 'MIT',
        description: '',
        dependencies: {
          '@repo-cooker-test/poissonier': '^1.2.3',
        },
        scripts: {
          test: "echo 'test script OK'",
        },
        version: '4.5.6',
      },
      {
        path: join(
          config.packagesPaths['@repo-cooker-test/entremetier'],
          'package.json'
        ),
        name: '@repo-cooker-test/entremetier',
        version: '2.3.4',
        description: '',
        scripts: {},
        license: 'MIT',
      },
      {
        path: join(
          config.packagesPaths['@repo-cooker-test/pastry-chef'],
          'package.json'
        ),
        name: '@repo-cooker-test/pastry-chef',
        version: '5.3.4',
        description: '',
        peerDependencies: {
          '@repo-cooker-test/sous-chef': '^0.3.9',
        },
        scripts: {
          test: 'exit -1',
          'other-script': "echo 'Other Script OK'",
        },
        license: 'MIT',
      },
      {
        path: join(
          config.packagesPaths['@repo-cooker-test/poissonier'],
          'package.json'
        ),
        name: '@repo-cooker-test/poissonier',
        version: '1.2.3',
        description: '',
        devDependencies: {
          '@repo-cooker-test/entremetier': '^2.3.4',
        },
        scripts: {},
        license: 'MIT',
      },
    ]

    testAction(
      writeVersionsToPackages,
      { newVersionByPackage, currentVersionByPackage, written },
      { written: writtenContent },
      done,
      { dryRun }
    )
  })
})
