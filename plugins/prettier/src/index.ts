import {
  addDependecies,
  getPackages,
  run,
  isPackageInstalled,
} from '@nissix/plugins'

export async function execute() {
  // get all packages in repo
  const packages = await getPackages()
  // check if prettier is already installed
  await Promise.all(
    packages.map(async pkg => {
      // if not
      if (!isPackageInstalled(pkg.content?.devDependencies, 'prettier')) {
        // install prettier as dev dep
        await addDependecies(['prettier'], 'development')
      }

      await run('npx prettier --write .', { cwd: pkg.path })
      return pkg.path
    }),
  )
}

// TODO: this will export a manifest for options that will show to the user and be consumed in execute
// export async function getOptions() {
//
// }
