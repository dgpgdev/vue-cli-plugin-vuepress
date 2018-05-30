module.exports = [{
    type: 'confirm',
    name: 'enabledConfig',
    message: '📖 custom configuration file ?',
    default: false,
  },
  {
    type: 'input',
    name: 'rootDoc',
    message: 'input docs directory',
    default: 'docs',
    when: answers => answers.enabledConfig
  },
  {
    type: 'input',
    name: 'title',
    message: 'Title for the site (default project name)',
    when: answers => answers.enabledConfig
  },
  {
    type: 'confirm',
    name: 'deploy',
    message: 'Docs will be deploy to GitHub or GitLab ?',
    default: false,
    when: answers => answers.enabledConfig
  },
  {
    type: 'list',
    name: 'repotype',
    message: 'Choose your repo type',
    choices: ['github', 'gitlab'],
    default: 'github',
    when: answers => answers.deploy
  },
  {
    type: 'list',
    name: 'repotype_uri',
    message: 'Select url type to deploy your project',
    choices: ['https://<USERNAME>.<GIT PLATEFORM>.io/', 'https://<USERNAME>.<GIT PLATEFORM>.io/<REPO>/'],
    default: 1,
    when: answers => answers.deploy
  },
  {
    type: 'input',
    name: 'repo_name',
    message: 'Insert repo name (default project name)',
    when: answers => answers.deploy && answers.repotype_uri === 'https://<USERNAME>.<GIT PLATEFORM>.io/<REPO>/'
  },

  {
    type: 'input',
    name: 'output',
    message: 'Output directory',
    default: 'vuepress',
    when: answers => answers.enabledConfig && !answers.deploy
  },

  {
    type: 'confirm',
    name: 'externalComponent',
    message: 'Register vue project components',
    default: false,
    when: answers => answers.enabledConfig
  },
  {
    type: 'input',
    name: 'folderComponent',
    message: 'Components folder',
    default: 'src/components',
    when: answers => answers.externalComponent
  }
]