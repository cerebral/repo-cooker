let nodegit
const NODEGIT_VERSION = '0.20.3'
try {
  nodegit = require('nodegit')
} catch (err) {
  throw new Error(
    `\x1b[31mNODEGIT REQUIRED FOR GitProvider. Install with \x1b[0m\n\x1b[32mnpm install --no-save nodegit@${NODEGIT_VERSION}\x1b[0m`
  )
}
export { nodegit }
