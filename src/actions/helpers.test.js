import { backwardGraph, forwardGraph } from './helpers'

import assert from 'test-utils/assert'

describe('helpers.backwardGraph', () => {
  it('should walk dependency graph backwards and return visited nodes', (done) => {
    /*
      depends on
      a --> b --> c
        --> d
      e --> b
      */
    const deps = {
      a: ['b', 'd'],
      b: ['c'],
      c: [],
      d: [],
      e: ['b'],
      f: [],
    }
    assert.deepEqual(
      backwardGraph(deps, ['c']),
      { c: true, b: true, a: true, e: true },
      done
    )
  })

  it('should support circular depencencies', (done) => {
    /*
    depends on
    a --> b --> c
      --> d --> a
    e
    */
    const deps = {
      a: ['b', 'd'],
      b: ['c'],
      c: [],
      d: ['a'],
      e: [],
      f: [],
    }
    assert.deepEqual(
      backwardGraph(deps, ['c']),
      { c: true, b: true, a: true, d: true },
      done
    )
  })
})

describe('helpers.forwardGraph', () => {
  it('should walk dependency graph forwards and return visited nodes', (done) => {
    /*
      depends on
      a --> b --> c
        --> d
      e
      */
    const deps = {
      a: ['b', 'd'],
      b: ['c'],
      c: [],
      d: [],
      e: [],
      f: [],
    }
    assert.deepEqual(
      forwardGraph(deps, ['a', 'e']),
      { a: true, b: true, c: true, d: true, e: true },
      done
    )
  })

  it('should support circular depencencies', (done) => {
    /*
    depends on
    a --> b --> c
      --> d --> a
    e
    */
    const deps = {
      a: ['b', 'd'],
      b: ['c'],
      c: [],
      d: ['a'],
      e: [],
      f: [],
    }
    assert.deepEqual(
      forwardGraph(deps, ['a', 'e']),
      { a: true, b: true, c: true, d: true, e: true },
      done
    )
  })
})
