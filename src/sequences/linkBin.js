import * as cook from '../actions'

export const linkBinSequence = [cook.link, cook.fireworksWithTitle('link bin')]

export const linkBinSetup = {
  name: 'linkBin',
  use: {},
  sequence: linkBinSequence,
}
