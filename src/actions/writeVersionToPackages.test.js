/* eslint-env mocha */
import { testAction } from 'test-utils'
import { writeVersionToPackages } from './'

it('should write new versions to package.json', done => {
  const newVersionByPackage = [
    { name: '@repo-cooker-test/commis', version: '4.5.6' },
  ]
  const commands = [
    '[fs.writeFile] ...ooker-test/commis/package.json ...s": {},\n  "version": "4.5.6"\n} {"encoding":"utf8"}',
  ]
  testAction(
    writeVersionToPackages,
    { newVersionByPackage },
    { commands },
    done
  )
})
