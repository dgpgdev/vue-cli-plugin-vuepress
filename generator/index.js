
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
 
  // copy and render all files in ./template with ejs
  //api.render('./templates', {...options})
 
  let conf = require('./templates/config.js')
  conf.title = options.title
  conf.dest = options.output
  conf = `module.exports = ${JSON.stringify(conf, null, 2)}`
  api.onCreateComplete(() => {
    const path = require('path') 
    const shell = require('shelljs')
    shell.mkdir('-p', path.resolve(options.rootDoc+'/.vuepress'))
   //console.log(path.resolve(__dirname+'/templates/README.md'))
    shell.cp(path.resolve(__dirname+'/templates/README.md'), path.resolve(options.rootDoc+'/README.md'))
    shell.echo(conf).to(options.rootDoc+'/.vuepress/config.js')
    
  })

}