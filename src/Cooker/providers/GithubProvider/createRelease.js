import axios from 'axios'
import { join } from '../../../helpers/path'
import { readFile } from 'fs'

const REPO_URL_RE = /^.*:\/\/([^/]+)\/([^/]+)\/([^.]+)/

function getRepositoryInfo(path) {
  return new Promise((resolve, reject) => {
    const packageJsonPath = join(path, 'package.json')
    readFile(packageJsonPath, (err, data) => {
      if (err) {
        reject(new Error(`Could not read '${packageJsonPath}' (${err}).`))
      }
      resolve(JSON.parse(data))
    })
  }).then(details => {
    const { repository } = details
    if (!repository) {
      throw new Error(
        `Cannot find repository url: missing 'repository' entry in package.json.`
      )
    }
    const { url } = repository
    if (!url) {
      throw new Error(
        `Cannot find repository url: missing 'url' entry in 'repository' in package.json.`
      )
    }
    const match = REPO_URL_RE.exec(url)
    if (!match) {
      throw new Error(`Could not parse repository url '${url}'.`)
    }
    return { domain: match[1], owner: match[2], repo: match[3] }
  })
}

export function createRelease(path, tagName, body) {
  // POST /repos/:owner/:repo/releases
  const data = {
    tag_name: tagName,
    name: tagName,
    body,
    draft: false,
    prerelease: false,
  }

  const headers = {
    'User-Agent': 'repo-cooker',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${
      process.env.REPO_COOKER_GITHUB_TOKEN || process.env.GH_TOKEN
    }`,
    'X-GitHub-Api-Version': '2022-11-28',
  }

  return new Promise((resolve, reject) => {
    getRepositoryInfo(path)
      .then(({ domain, owner, repo }) => {
        if (domain !== 'github.com') {
          reject(
            new Error(
              `Release to domain '${domain}' is not supported (please use 'github.com').`
            )
          )
        }
        const url = `https://api.${domain}/repos/${owner}/${repo}/releases`
        return axios
          .post(url, data, { headers })
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            if (error.response) {
              let errorInfo = ''
              for (const entry in error.response.data) {
                errorInfo += `\n  ${entry}: '${error.response.data[entry]}'`
              }
              reject(
                new Error(
                  'Request failed with status code ' +
                    error.response.status +
                    errorInfo
                )
              )
            } else {
              reject(new Error(error))
            }
          })
      })
      .catch(reject)
  })
}
