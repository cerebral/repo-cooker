import { Cooker } from 'repo-cooker'

process.env.REPO_COOKER_GITHUB_TOKEN = process.env.GH_TOKEN

export const cooker = Cooker(process.argv, {
  devtools: null,
  path: '.',
})
