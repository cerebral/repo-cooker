/* eslint-env jest */
import { remap } from './'
import { testAction } from 'test-utils'

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

  it('should remap given prop with async', done => {
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
      remap('someObject', (key, value, { props }) =>
        Promise.resolve(`${key} ${value} (${props.hash})`)
      ),
      { hash, someObject },
      { someObject: remapedObject },
      done
    )
  })
})
