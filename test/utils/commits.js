export const tags = [
  {
    tag: 'release_2017-07-21_1413',
    hash: 'c465e3323fc2c63fbeb91f9b9b43379d28f9b761',
    date: '2017-06-29T14:52:44.000Z',
  },
  {
    tag: 'release_2017-07-21_1546',
    hash: 'dabd0553827af3b6afbfc408905b10de8d3cb72d',
    date: '2017-06-29T16:34:23.000Z',
  },
]

export const master = 'a234b6ef518dc099ddc5860907a79c658fe73d04'

export const commits = [
  {
    author: {
      name: 'Aleksey Gurianov',
      email: 'gurianov@gmail.com',
    },
    date: '2017-06-29T11:14:02.000Z',
    hash: 'c327edd6671b814b01f4d5c82a73cb4f8fb034b3',
    message: 'chore: initial setup\n',
    files: [
      '.cz-config.js',
      '.eslintignore',
      '.eslintrc.json',
      '.gitattributes',
      '.gitignore',
      '.repo-cooker/link.js',
      '.repo-cooker/publish.js',
      'LICENSE',
      'README.md',
      'package.json',
      'packages/node_modules/@repo-cooker-test/commis/package.json',
      'packages/node_modules/@repo-cooker-test/entremetier/package.json',
      'packages/node_modules/@repo-cooker-test/executive-chef/package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'packages/node_modules/@repo-cooker-test/poissonier/package.json',
      'packages/node_modules/@repo-cooker-test/sous-chef/package.json',
      'packages/node_modules/repo-cooker-test/package.json',
      'packages/private-cooker/package.json',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T12:47:42.000Z',
    hash: '3e9f0ff967855d62bbd5dc9a3ba3557357654641',
    message: 'chore(readme): update readme with another todo\n',
    files: ['README.md'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T14:51:08.000Z',
    hash: '06b4a9a31f5ac03f755c843388f6bddaec3ceaa8',
    message: 'feat(pastry-chef): pastry fixes issues\n\nISSUES CLOSED: #1\n',
    files: ['packages/node_modules/@repo-cooker-test/pastry-chef/README.md'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T14:52:44.000Z',
    hash: 'c465e3323fc2c63fbeb91f9b9b43379d28f9b761',
    message:
      'fix(commis): removed excessive salt\n\nBREAKING CHANGE:\n\nhad to add milk\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/README.md'],
  },
  {
    author: {
      name: 'Henri Hulski',
      email: 'henri.hulski@gazeta.pl',
    },
    date: '2017-06-29T15:07:22.000Z',
    hash: '194bd99fcad286821c6d18cf9765a95d741cd018',
    message: 'chore(repo-cooker-test):remove package from scope',
    files: ['packages/node_modules/repo-cooker-test/package.json'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T16:34:23.000Z',
    hash: 'dabd0553827af3b6afbfc408905b10de8d3cb72d',
    message:
      'feat(poissonier): fish speaks german\n\nwe need to evaluate release tags\n',
    files: ['packages/node_modules/@repo-cooker-test/poissonier/README.md'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-05T17:22:40.000Z',
    hash: '9c1074b867a2ff0169530ad159b1da518aa8fa0d',
    message: 'chore(publish): update publish script with renamed actions\n',
    files: [
      '.eslintrc.json',
      '.repo-cooker/link.js',
      '.repo-cooker/publish.js',
      'package.json',
      'scripts/cooker.js',
      'scripts/link.js',
      'scripts/publish.js',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-08T14:11:52.000Z',
    hash: 'be939615058a0ebf56d575ff787d1bc5ad668bdd',
    message:
      'fix(commis): fixed something in API.\n\nBREAKING CHANGE:\n\nno more salt in soup\n',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/README.md',
      'packages/node_modules/@repo-cooker-test/commis/package.json',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-11T08:53:22.000Z',
    hash: 'a50098c42782cb2a3a0360fe4fa7d7ba58f5318d',
    message: 'chore(repo-cooker): add repository url, fix example script\n',
    files: ['package.json', 'scripts/publish.js'],
  },
  {
    author: {
      name: 'Christian Alfoni',
      email: 'christianalfoni@gmail.com',
    },
    date: '2017-07-16T16:32:25.000Z',
    hash: '9b973a6a2eb010fa5e866a4bd9ba307f4fb13fe1',
    message: 'feat(commis): depends on poissonier\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/package.json'],
  },
  {
    author: {
      name: 'Christian Alfoni',
      email: 'christianalfoni@gmail.com',
    },
    date: '2017-07-20T19:20:50.000Z',
    hash: 'ad1a1b97bb36fff1ddd6a1970d20296970b1c720',
    message: 'Initial run of publish script\n',
    files: [
      '.babelrc',
      'package.json',
      'scripts/cooker.js',
      'scripts/publish.js',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-21T16:11:30.000Z',
    hash: 'c15e818703b5e235529beae1973125c1817cc06f',
    message: 'chore(repo-cooker): fix publish script\n',
    files: ['package.json', 'scripts/cooker.js', 'scripts/publish.js'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-24T10:58:18.000Z',
    hash: '492980b1aead601c4391e380f5e61f9d9adabff0',
    message: 'chore(monorepo): add devDependencies and peerDependencies\n',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'packages/node_modules/@repo-cooker-test/poissonier/package.json',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-25T12:59:12.000Z',
    hash: 'ddc3d6745845aedbf6170900fec1a4e6a748ab2b',
    message: 'chore(commis): add dummy script for testing\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/package.json'],
  },

  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-08-10T13:45:19.000Z',
    hash: '7061aa80efacfb4101740b417e3957296244467e',
    message: 'feat(repo-cooker-test): auto publish using travis\n',
    files: [
      '.babelrc',
      '.travis.yml',
      'package.json',
      'scripts/cooker.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-08-10T13:55:08.000Z',
    hash: 'dc0e6dfc41148cde76656204693213bf7c2c0ad0',
    message:
      'fix(repo-cooker-test): npm does not need more then auth token in .npmrc\n',
    files: ['.travis.yml'],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-04T16:02:26.000Z',
    hash: '115cf1783fd08c1d0f7acac90226ef5019f49a61',
    message: 'chore(testing): add failing test in one of the repos.\n',
    files: ['packages/node_modules/@repo-cooker-test/pastry-chef/package.json'],
  },

  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-05T15:11:48.000Z',
    hash: 'd1c371bc15e0757e696333f0ad26cf1a7cd5bfe6',
    message: 'chore(repo-cooker): update scripts for latest repo-cooker.\n',
    files: [
      '.babelrc',
      '.prettierrc.json',
      'package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'scripts/cooker.js',
      'scripts/dummy.js',
      'scripts/index.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-06T15:58:30.000Z',
    hash: '1c9eec44e16b88a04809c115d4713b142901e049',
    message: 'fix(repo-cooker-test): using default release in repo-cooker\n',
    files: [
      'package.json',
      'scripts/link.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-20T10:16:14.000Z',
    hash: '60e29c9dd656504be9c515c553637cf532c6def3',
    message:
      "chore(package.json): rename 'prepublish' script to 'prepare' in package.json\n",
    files: ['package.json'],
  },
  {
    author: {
      name: 'Andrew Balmos',
      email: 'andrew@balmos.org',
    },
    date: '2018-07-17T21:13:45.000Z',
    hash: 'a234b6ef518dc099ddc5860907a79c658fe73d04',
    message:
      'feat(executive-chef): Add script for runNpmScriptByRelatedPackage test\n',
    files: [
      'packages/node_modules/@repo-cooker-test/executive-chef/package.json',
    ],
  },
]

export const parsedCommits = [
  {
    author: {
      name: 'Aleksey Gurianov',
      email: 'gurianov@gmail.com',
    },
    date: '2017-06-29T11:14:02.000Z',
    hash: 'c327edd6671b814b01f4d5c82a73cb4f8fb034b3',
    message: 'chore: initial setup\n',
    files: [
      '.cz-config.js',
      '.eslintignore',
      '.eslintrc.json',
      '.gitattributes',
      '.gitignore',
      '.repo-cooker/link.js',
      '.repo-cooker/publish.js',
      'LICENSE',
      'README.md',
      'package.json',
      'packages/node_modules/@repo-cooker-test/commis/package.json',
      'packages/node_modules/@repo-cooker-test/entremetier/package.json',
      'packages/node_modules/@repo-cooker-test/executive-chef/package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'packages/node_modules/@repo-cooker-test/poissonier/package.json',
      'packages/node_modules/@repo-cooker-test/sous-chef/package.json',
      'packages/node_modules/repo-cooker-test/package.json',
      'packages/private-cooker/package.json',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    summary: 'initial setup',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T12:47:42.000Z',
    hash: '3e9f0ff967855d62bbd5dc9a3ba3557357654641',
    message: 'chore(readme): update readme with another todo\n',
    files: ['README.md'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'readme',
    summary: 'update readme with another todo',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T14:51:08.000Z',
    hash: '06b4a9a31f5ac03f755c843388f6bddaec3ceaa8',
    message: 'feat(pastry-chef): pastry fixes issues\n\nISSUES CLOSED: #1\n',
    files: ['packages/node_modules/@repo-cooker-test/pastry-chef/README.md'],
    body: '',
    issues: ['#1'],
    breaks: [],
    type: 'feat',
    scope: 'pastry-chef',
    summary: 'pastry fixes issues',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T14:52:44.000Z',
    hash: 'c465e3323fc2c63fbeb91f9b9b43379d28f9b761',
    message:
      'fix(commis): removed excessive salt\n\nBREAKING CHANGE:\n\nhad to add milk\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/README.md'],
    body: '',
    issues: [],
    breaks: ['had to add milk'],
    type: 'fix',
    scope: 'commis',
    summary: 'removed excessive salt',
  },
  {
    author: {
      name: 'Henri Hulski',
      email: 'henri.hulski@gazeta.pl',
    },
    date: '2017-06-29T15:07:22.000Z',
    hash: '194bd99fcad286821c6d18cf9765a95d741cd018',
    message: 'chore(repo-cooker-test):remove package from scope',
    files: ['packages/node_modules/repo-cooker-test/package.json'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'repo-cooker-test',
    summary: 'remove package from scope',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-06-29T16:34:23.000Z',
    hash: 'dabd0553827af3b6afbfc408905b10de8d3cb72d',
    message:
      'feat(poissonier): fish speaks german\n\nwe need to evaluate release tags\n',
    files: ['packages/node_modules/@repo-cooker-test/poissonier/README.md'],
    body: 'we need to evaluate release tags',
    issues: [],
    breaks: [],
    type: 'feat',
    scope: 'poissonier',
    summary: 'fish speaks german',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-05T17:22:40.000Z',
    hash: '9c1074b867a2ff0169530ad159b1da518aa8fa0d',
    message: 'chore(publish): update publish script with renamed actions\n',
    files: [
      '.eslintrc.json',
      '.repo-cooker/link.js',
      '.repo-cooker/publish.js',
      'package.json',
      'scripts/cooker.js',
      'scripts/link.js',
      'scripts/publish.js',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'publish',
    summary: 'update publish script with renamed actions',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-08T14:11:52.000Z',
    hash: 'be939615058a0ebf56d575ff787d1bc5ad668bdd',
    message:
      'fix(commis): fixed something in API.\n\nBREAKING CHANGE:\n\nno more salt in soup\n',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/README.md',
      'packages/node_modules/@repo-cooker-test/commis/package.json',
    ],
    body: '',
    issues: [],
    breaks: ['no more salt in soup'],
    type: 'fix',
    scope: 'commis',
    summary: 'fixed something in API.',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-11T08:53:22.000Z',
    hash: 'a50098c42782cb2a3a0360fe4fa7d7ba58f5318d',
    message: 'chore(repo-cooker): add repository url, fix example script\n',
    files: ['package.json', 'scripts/publish.js'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'repo-cooker',
    summary: 'add repository url, fix example script',
  },
  {
    author: {
      name: 'Christian Alfoni',
      email: 'christianalfoni@gmail.com',
    },
    date: '2017-07-16T16:32:25.000Z',
    hash: '9b973a6a2eb010fa5e866a4bd9ba307f4fb13fe1',
    message: 'feat(commis): depends on poissonier\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/package.json'],
    body: '',
    issues: [],
    breaks: [],
    type: 'feat',
    scope: 'commis',
    summary: 'depends on poissonier',
  },

  {
    author: {
      name: 'Christian Alfoni',
      email: 'christianalfoni@gmail.com',
    },
    date: '2017-07-20T19:20:50.000Z',
    hash: 'ad1a1b97bb36fff1ddd6a1970d20296970b1c720',
    message: 'Initial run of publish script\n',
    files: [
      '.babelrc',
      'package.json',
      'scripts/cooker.js',
      'scripts/publish.js',
    ],
    body: '',
    issues: [],
    breaks: [],
    summary: 'Initial run of publish script',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-21T16:11:30.000Z',
    hash: 'c15e818703b5e235529beae1973125c1817cc06f',
    message: 'chore(repo-cooker): fix publish script\n',
    files: ['package.json', 'scripts/cooker.js', 'scripts/publish.js'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'repo-cooker',
    summary: 'fix publish script',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-24T10:58:18.000Z',
    hash: '492980b1aead601c4391e380f5e61f9d9adabff0',
    message: 'chore(monorepo): add devDependencies and peerDependencies\n',
    files: [
      'packages/node_modules/@repo-cooker-test/commis/package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'packages/node_modules/@repo-cooker-test/poissonier/package.json',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'monorepo',
    summary: 'add devDependencies and peerDependencies',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-07-25T12:59:12.000Z',
    hash: 'ddc3d6745845aedbf6170900fec1a4e6a748ab2b',
    message: 'chore(commis): add dummy script for testing\n',
    files: ['packages/node_modules/@repo-cooker-test/commis/package.json'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'commis',
    summary: 'add dummy script for testing',
  },

  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-08-10T13:45:19.000Z',
    hash: '7061aa80efacfb4101740b417e3957296244467e',
    message: 'feat(repo-cooker-test): auto publish using travis\n',
    files: [
      '.babelrc',
      '.travis.yml',
      'package.json',
      'scripts/cooker.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'feat',
    scope: 'repo-cooker-test',
    summary: 'auto publish using travis',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2017-08-10T13:55:08.000Z',
    hash: 'dc0e6dfc41148cde76656204693213bf7c2c0ad0',
    message:
      'fix(repo-cooker-test): npm does not need more then auth token in .npmrc\n',
    files: ['.travis.yml'],
    body: '',
    issues: [],
    breaks: [],
    type: 'fix',
    scope: 'repo-cooker-test',
    summary: 'npm does not need more then auth token in .npmrc',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-04T16:02:26.000Z',
    hash: '115cf1783fd08c1d0f7acac90226ef5019f49a61',
    message: 'chore(testing): add failing test in one of the repos.\n',
    files: ['packages/node_modules/@repo-cooker-test/pastry-chef/package.json'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'testing',
    summary: 'add failing test in one of the repos.',
  },

  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-05T15:11:48.000Z',
    hash: 'd1c371bc15e0757e696333f0ad26cf1a7cd5bfe6',
    message: 'chore(repo-cooker): update scripts for latest repo-cooker.\n',
    files: [
      '.babelrc',
      '.prettierrc.json',
      'package.json',
      'packages/node_modules/@repo-cooker-test/pastry-chef/package.json',
      'scripts/cooker.js',
      'scripts/dummy.js',
      'scripts/index.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'repo-cooker',
    summary: 'update scripts for latest repo-cooker.',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-06T15:58:30.000Z',
    hash: '1c9eec44e16b88a04809c115d4713b142901e049',
    message: 'fix(repo-cooker-test): using default release in repo-cooker\n',
    files: [
      'package.json',
      'scripts/link.js',
      'scripts/publish.js',
      'scripts/releaseNotesTemplate.js',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'fix',
    scope: 'repo-cooker-test',
    summary: 'using default release in repo-cooker',
  },
  {
    author: {
      name: 'Gaspard Bucher',
      email: 'gaspard@lucidogen.io',
    },
    date: '2018-06-20T10:16:14.000Z',
    hash: '60e29c9dd656504be9c515c553637cf532c6def3',
    message:
      "chore(package.json): rename 'prepublish' script to 'prepare' in package.json\n",
    files: ['package.json'],
    body: '',
    issues: [],
    breaks: [],
    type: 'chore',
    scope: 'package.json',
    summary: "rename 'prepublish' script to 'prepare' in package.json",
  },
  {
    author: {
      name: 'Andrew Balmos',
      email: 'andrew@balmos.org',
    },
    date: '2018-07-17T21:13:45.000Z',
    hash: 'a234b6ef518dc099ddc5860907a79c658fe73d04',
    message:
      'feat(executive-chef): Add script for runNpmScriptByRelatedPackage test\n',
    files: [
      'packages/node_modules/@repo-cooker-test/executive-chef/package.json',
    ],
    body: '',
    issues: [],
    breaks: [],
    type: 'feat',
    scope: 'executive-chef',
    summary: 'Add script for runNpmScriptByRelatedPackage test',
  },
]
