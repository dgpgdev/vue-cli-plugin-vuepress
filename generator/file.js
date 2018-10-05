const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

exports.readPackage = function(file) {
	return JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }))
}

exports.createFile = function(file, data) {
	fs.writeFile(path.resolve(file), data, (error) => {
		if (error) throw error
	})
}

exports.createDir = function(dir) {
	shell.mkdir('-p', path.resolve(dir))
}

exports.copyFile = function(from, to) {
	shell.cp(path.resolve(from), path.resolve(to))
}

exports.makeFirebaseRC = function(fbID) {
	return `{
  "projects": {
    "default": "${fbID}"
  }
}`
}
exports.makeFirebaseJson = function(folder) {
	return `{
    "hosting": {
      "public": "${folder}",
      "ignore": []
    }
  }`
}

exports.makeEnhance = function(vuepressFolder, componentFolder) {
	const componentDir = path.relative(vuepressFolder, componentFolder)
	const regDir = new RegExp('.*\\/')
	const regExt = new RegExp('\\.\\w+$')
	return `import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'
  export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
  }) => {
    // ...apply enhancements to the app
   
    const requireComponent = require.context(
      // The relative path of the components folder
      '${componentDir}',
      // Whether or not to look in subfolders
      true,
      // The regular expression used to match base component filenames
      /.(vue|js)$/
    )
    
    
    requireComponent.keys().forEach(fileName => {
      // Get component config
      const componentConfig = requireComponent(fileName)
      const fc = fileName.split('/')
      const f = fc[fc.length - 1]
      // Get PascalCase name of component
      const componentName = upperFirst(
        camelCase(
          f.replace(${regDir}, '$1').replace(${regExt},'')
        )
      )
      // Register component globally
      Vue.component(
        componentName,
        componentConfig.default || componentConfig
      )
    })
  }`
}
