# vue-cli-plugin-vuepress

vue cli 3 plugin to include vuepress inside your vuejs project (documentation).

## Install from vue cli
``` sh
vue add vuepress
```

## Run Commands
after install you can see two new scripts command. 
- docs:dev laucnh dev server to serve docs  with hotreload
- docs:build build your doc inside output directory
``` sh
yarn docs:dev

//or

yarn docs:build
```

## Add external components
by default you could add component in .vuepress/components folder to use inside markdown page. Often you need to expose components from your vue project (generally locate at src/components).
Now you can assign directly your components to vuepress with prompts command.


``` sh
# when you see 
add external vue components ? y

# choose your component folder (default src/components)
components folder src/myfoldercomponent
```
Congrats! your components are enabled inside vuepress

you can do 
```markdown
# page

<myprojectcomponent />
```

See more configuration options [config vuepress](https://vuepress.vuejs.org/config/)


[vuepress website](https://vuepress.vuejs.org)