# Nissix Plugins

Nissix is a system that runs code on your repository and creates PRs for you.

This repository contains Nissix's public plugins.

## What is a Nissix plugin?

A plugin is an executeable that runs after the repository has been cloned.

It changes the files as it see fits:

1. Reading the relevant files from the filesystem.
2. Changing the files either by using regexes and string replaces or AST parses such as [babel](https://babeljs.io/) or [recast](https://github.com/benjamn/recast).
3. Then (once the plugin finishes it's work) saves the files.

And Nissix creates a PR for it.

## How to create your own plugin?

Run

```sh
yarn create
```

Or

```sh
npm run create
```

Which basically the next steps for you:

1. Create a directory with the plugin name in `plugins` directory.
2. Create `package.json` file in the plugin directory that you created.
   1. The `package.json` should have a `name` property (usually `nissix-` then the name of the directory you just created).
   2. The `package.json` should have a `bin` property which states the file to run to execute the plugin.
   3. (optional) you can have `build` and `test` property if you want\ need.

**A plugin doesn't have to be in javascript or typescript.**
They just have to have a `package.json` file which is the manifest of the plugin.

Please see [prettier plugin](plugins/prettier) as an example
