module.exports = (api, options, rootOptions) => {
  const {
    copyFile,
    createDir,
    createFile,
    readPackage,
    makeEnhance
  } = require('./file')
  const util = require('util')
  const rootDoc = options.rootDoc || 'docs'

  // modify package.json fields
  api.extendPackage({
    scripts: {
      'docs:dev': `vuepress dev ${rootDoc}`,
      'docs:build': `vuepress build ${rootDoc}`
    },
    devDependencies: {
      vuepress: '^0.7.0'
    }
  })

  if (options.externalComponent) {
    api.extendPackage({
      devDependencies: {
        loadash: "^1.0.0"
      }
    })
  }
  //package.json content 
  const package = readPackage(api.resolve('package.json'))
  //get initial config
  let conf = require('./templates/config.js')
  //add prompts values to config
  conf.title = options.title || package.name
  const repo_name = options.repo_name ? options.repo_name : package.name
  conf.base = options.repotype_uri === 'https://<USERNAME>.<GIT PLATEFORM>.io/<REPO>/' ? `/${repo_name}/` : '/'
  conf.dest = options.deploy ? options.repotype === 'github' ? 'vuepress' : 'public' : 'vuepress'
  //convert file to string
  conf = `module.exports = ${
    util.inspect(conf, {depth: null, compact:false})
  }`

  api.onCreateComplete(() => {
    //create .vuepress folder
    createDir(rootDoc + '/.vuepress')
    if (options.repotype === 'gitlab') {
      copyFile(__dirname + '/templates/.gitlab-ci.yml', '.gitlab-ci.yml')
    }
    //conpy files inside .vuepress
    const cpFiles = ['README.md', 'page1.md', 'page2.md', 'page3.md']
    for (const f of cpFiles) {
      copyFile(__dirname + '/templates/' + f, rootDoc + '/' + f)
    }
    //write config js file
    createFile(rootDoc + '/.vuepress/config.js', conf)
    if (options.externalComponent) {
      createFile(rootDoc + '/.vuepress/enhanceApp.js', makeEnhance(rootDoc + '/.vuepress', options.folderComponent))
    }
  })
}