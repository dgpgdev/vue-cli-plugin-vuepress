module.exports = [
  {
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
    type: 'input',
    name: 'output',
    message: 'Output directory',
    default: 'vuepress',
    when: answers => answers.enabledConfig
  },
  {
    type: 'confirm',
    name: 'externalComponent',
    message: 'add external vue components',
    default: false,
    when: answers => answers.enabledConfig
  },
  {
    type: 'input',
    name: 'folderComponent',
    message: 'components folder',
    default: 'src/components',
    when: answers => answers.externalComponent
  }
]