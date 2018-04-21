
module.exports = (api, options, rootOptions) => {
  // modify package.json fields
  api.extendPackage({
    scripts: {
      'docs:dev': `vuepress dev ${options.rootDoc}` ,
      'docs:build': `vuepress build ${options.rootDoc}`
    },
    devDependencies: {
      vuepress: '^0.7.0'
    }
  })
  //get initial config
  let conf = require('./templates/config.js')
  //add prompts values to config
  conf.title = options.title
  conf.dest = options.output
  //convert file to string
  conf = `module.exports = ${JSON.stringify(conf, null, 2)}`

  api.onCreateComplete(() => {
    const path = require('path') 
    const shell = require('shelljs')
    const fs = require('fs')
    //create .vuepress folder
    shell.mkdir('-p', path.resolve(options.rootDoc+'/.vuepress'))
    //conpy files inside .vuepress
    shell.cp(path.resolve(__dirname+'/templates/README.md'), path.resolve(options.rootDoc+'/README.md'))

    fs.writeFile(path.resolve(options.rootDoc+'/.vuepress/config.js'),conf, error=> {
      if(error) throw error
    })
    //shell.echo(conf).to(options.rootDoc+'/.vuepress/config.js')
    
  })

}