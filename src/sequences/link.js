import * as cook from '../actions'

export const linkSequence = [cook.link, cook.fireworksWithTitle('link')]

export const linkSetup = {
  name: 'link',
  use: {},
  sequence: linkSequence,
}
