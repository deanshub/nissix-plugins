# Nissix Plugins

Nissix is a system that runs code on your repository and creates PRs for you.

This repository contains Nissix's public plugins.

## What is a Nissix plugin?

A plugin is an executeable that runs after the repository has been cloned.

It changes the files as it see fits:

1. reading the relevant files from the filesystem.
2. Then changing the files either by using regexes and string replaces or AST parses such as [babel](https://babeljs.io/) or [jscodeshift](https://github.com/facebook/jscodeshift) or [recast](https://github.com/benjamn/recast).
3. Then saves the files
   once the plugin finishes it's work, Nissix creates a PR for it.

## How to create your own plugin?

1. Create a directory with the plugin name in `plugins` directory.
2. Create `package.json` file in the plugin directory that you created.
   1. The `package.json` should have a `name` property (usually `nissix-` then the name of the directory you just created).
   2. The `package.json` should have a `bin` property which states the file to run to execute the plugin.
   3. (optional) you can have `build` and `test` property if you want\ need.

You can also run `npm run create` or `yarn create` which basically does all the above for you.

**A plugin doesn't have to be in javascript or typescript.**
They just have to have a `package.json` file which is the manifest of the plugin.

please see [prettier plugin](plugins/prettier) as an example
