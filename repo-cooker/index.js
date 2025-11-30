const { Cooker } = require('../dist/index.js')

if (!process.env.REPO_COOKER_GITHUB_TOKEN && process.env.GH_TOKEN) {
  process.env.REPO_COOKER_GITHUB_TOKEN = process.env.GH_TOKEN
}

module.exports.cooker = Cooker(process.argv, {
  devtools: null,
  path: '.',
})
