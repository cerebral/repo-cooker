export const tags = ['release_2017-06-29_1812', 'release_2017-06-29_1815']

export const master = 'd5698b72ad3df910916d8919cb165437b2b6b475'

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
    date: '2017-07-05T14:26:25.000Z',
    hash: 'd5698b72ad3df910916d8919cb165437b2b6b475',
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
    date: '2017-07-05T14:26:25.000Z',
    hash: 'd5698b72ad3df910916d8919cb165437b2b6b475',
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
]
