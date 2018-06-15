/* eslint-env mocha */
import { testAction } from 'test-utils'
import { filter } from './'

describe('filter', () => {
  it('should filter given prop synchronously', done => {
    const someObject = {
      foo: 'is foo',
      bar: 'is bar',
      bong: 'is bong',
      baz: 'is baz',
    }
    const hash = 'ho!'
    const filteredObject = {
      foo: 'is foo',
      baz: 'is baz',
    }
    testAction(
      filter(
        'someObject',
        (key, value) => key !== 'bar' && value !== 'is bong'
      ),
      { hash, someObject },
      { someObject: filteredObject },
      done
    )
  })

  it('should filter given prop asynchronously', done => {
    const someObject = {
      foo: 'is foo',
      bar: 'is bar',
      bong: 'is bong',
      baz: 'is baz',
    }
    const hash = 'ho!'
    const filteredObject = {
      foo: 'is foo',
      baz: 'is baz',
    }
    testAction(
      filter('someObject', (key, value) =>
        Promise.resolve(key !== 'bar' && value !== 'is bong')
      ),
      { hash, someObject },
      { someObject: filteredObject },
      done
    )
  })
})
