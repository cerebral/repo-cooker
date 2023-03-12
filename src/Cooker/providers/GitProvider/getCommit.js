import * as fs from 'fs'

import { TREE, readCommit, walk } from 'isomorphic-git'

function getAuthor(commit) {
  const author = commit.author
  return {
    name: author.name,
    email: author.email,
  }
}

async function getChangedFiles(commitHash1, commitHash2, dir) {
  return walk({
    fs,
    dir,
    trees: [TREE({ ref: commitHash1 }), TREE({ ref: commitHash2 })],
    map: async function (filepath, [A, B]) {
      // handle the initial commit
      if (commitHash2 === undefined) {
        B = null
      }

      // ignore directories
      if (filepath === '.') {
        return
      }
      if (
        (A !== null && (await A.type()) === 'tree') ||
        (B !== null && (await B.type()) === 'tree')
      ) {
        return
      }

      // generate ids
      const Aoid = A !== null ? await A.oid() : undefined
      const Boid = B !== null ? await B.oid() : undefined

      // Skip pairs where the oids are the same
      if (Aoid === Boid) {
        return
      }

      return filepath
    },
  })
}

export async function getCommit(repoPath, hash) {
  const commit = (await readCommit({ fs, dir: repoPath, oid: hash })).commit
  const previousHash = commit.parent[commit.parent.length - 1]

  return {
    author: getAuthor(commit),
    date: new Date(commit.committer.timestamp * 1000).toISOString(),
    hash,
    message: commit.message,
    files: (await getChangedFiles(hash, previousHash, repoPath)).sort(),
  }
}
