/* eslint-env mocha */
import { testAction } from 'test-utils'
import { remap } from './'

describe('remap', () => {
  it('should remap given prop', done => {
    const someObject = {
      foo: 'is foo',
      bar: 'is bar',
      baz: 'is baz',
    }
    const hash = 'ho!'
    const remapedObject = {
      foo: 'foo is foo (ho!)',
      bar: 'bar is bar (ho!)',
      baz: 'baz is baz (ho!)',
    }
    testAction(
      remap(
        'someObject',
        (key, value, { props }) => `${key} ${value} (${props.hash})`
      ),
      { hash, someObject },
      { someObject: remapedObject },
      done
    )
  })
})
