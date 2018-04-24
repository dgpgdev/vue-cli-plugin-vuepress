
module.exports = (api, options, rootOptions) => {
  const fs = require('fs')
  const util = require('util')
  const rootDoc = options.rootDoc || 'docs'
   
  // modify package.json fields
  api.extendPackage({
    scripts: {
      'docs:dev': `vuepress dev ${rootDoc}` ,
      'docs:build': `vuepress build ${rootDoc}`
    },
    devDependencies: {
      vuepress: '^0.7.0'
    }
  })
  //package.json content 
  const package = JSON.parse(fs.readFileSync(api.resolve('package.json'), { encoding: 'utf8' }))
  //get initial config
  let conf = require('./templates/config.js')
  //add prompts values to config
  conf.title = options.title || package.name
  conf.dest = options.output
  //convert file to string
  conf = `module.exports = ${
    util.inspect(conf, {depth: null, compact:false})
  }`

  api.onCreateComplete(() => {
    const path = require('path') 
    const shell = require('shelljs')
    //create .vuepress folder
    shell.mkdir('-p', path.resolve(rootDoc+'/.vuepress'))
    //conpy files inside .vuepress
    const cpFiles = ['README.md', 'page1.md', 'page2.md', 'page3.md']
    for(const f of cpFiles){
      shell.cp(path.resolve(__dirname+'/templates/'+f), path.resolve(rootDoc+'/'+f))
    }
    //write config js file
    fs.writeFile(path.resolve(rootDoc+'/.vuepress/config.js'),conf, error=> {
      if(error) throw error
    })    
  })

}