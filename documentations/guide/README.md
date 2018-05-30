# Installation



## Install from vue cli
``` sh
vue add vuepress
```

## Prompt commands
#### custom configuration file ? (y/N)
Allow you to custom default vuepress configuration. By default No
#### input docs directory (docs)
type your docs directory, relative to root project folder. By default /docs
#### Title for the site
Title for documentation by default project name locate inside package.json
#### Docs will be deploy to GitHub or GitLab ? (y/N)
you can lazy configure vuepress to deploy doc for github or gitlab. By default No
#### Choose repo type
Choose a git platform between github or gitlab
::: warning
if you choose gitlab, a gitlab-ci.yml will be create in root project folder
:::
#### Select url type to deploy your project
Select type to display docs
#### Insert repo name (default project name)
repository name
#### Add project components
by default you could add component in .vuepress/components folder to use inside markdown page. Often you need to expose components from your vue project (generally locate at src/components).
Now you can assign directly your components to vuepress with prompts command.
Congrats! your components are enabled inside vuepress

![do it](https://media.giphy.com/media/3o85xtLX7zCyeeWGLC/giphy.gif)
```markdown
# page

<myprojectcomponent />
```

## Run Commands
after install you can see two new scripts command. 
- docs:dev launch dev server to serve docs  with hotreload
- docs:build build your doc inside output directory
``` sh
yarn docs:dev

//or

yarn docs:build
```






See more configuration options [config vuepress](https://vuepress.vuejs.org/config/)


[vuepress website](https://vuepress.vuejs.org)