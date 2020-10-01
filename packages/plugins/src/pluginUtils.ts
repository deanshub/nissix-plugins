import path from 'path'
import execa from 'execa'
import hasYarn from 'has-yarn'
import fs from 'fs-extra'
import globby from 'globby'
import readPkg from 'read-pkg'
import typeFest from 'type-fest';

type DependencyType = 'production' | 'development' | 'peer'
type DependencyTypeFlag = '' | ' -D' | ' -P'
type DependenciesType = typeFest.PackageJson.Dependency & { [key: string]: string }

export interface File {
    path: string
    content: string
}

function getDepTypeFlag(type: DependencyType): DependencyTypeFlag {
    switch (type) {
        case 'production':
            return ''
        case 'development':
            return ' -D'
        case 'peer':
            return ' -P'
    }
}

export async function addDependecies(
    dependencies: string[],
    type: DependencyType = 'production',
    { cwd }: { cwd: string } = { cwd: process.cwd() },
) {
    const flag = getDepTypeFlag(type)
    let addingCommand = `npm i -S${flag}`
    if (hasYarn()) {
        addingCommand = `yarn add${flag}`
    }

    await execa.command(`${addingCommand} ${dependencies.join(' ')}`, { cwd })
}

export function run(
    command: string,
    { cwd }: { cwd: string } = { cwd: process.cwd() },
) {
    return execa.command(command, { cwd })
}

export async function getFiles(
    globbPattern: string | string[],
    projectDir: string = process.cwd(),
): Promise<File[]> {
    const paths = await globby(globbPattern, { cwd: projectDir })
    return Promise.all(
        paths.map(async (packagePath) => {
            const content = await fs.readFile(packagePath, 'utf-8')
            return {
                path: path.join(projectDir, packagePath),
                content,
            }
        }),
    )
}

export async function getPackages(projectDir: string = process.cwd()) {
    // let paths = await globby(['lerna.json', 'package.json', '**/package.json', '!node_modules'], {
    let paths = await globby(
        ['package.json', '**/package.json', '!node_modules'],
        {
            cwd: projectDir,
        },
    )
    // const lernaPath =  paths.find(x=>x.includes('lerna.json'))
    // if (lernaPath){
    //     const lernaContent = await fs.readJson(lernaPath)
    //     lernaContent.packages.flatmap(pkgPath=>pkgPath.endsWith('*')?:`${pkgPath}/package.json`)
    // }
    return Promise.all(
        paths.map(async (pkgJsonPath) => {
            const pkgPath = path.dirname(pkgJsonPath)
            const pkg = await readPkg({ cwd: pkgPath })
            return { content: pkg, path: pkgPath }
        }),
    )
}

/**
checks if a package exists in given dependencies

@param dependencies - a dependencies collection or an array of dependencies collection to search
@param packageName - the package's name which is searched for

*/
export function isPackageInstalled(dependencies: DependenciesType | DependenciesType[], packageName: string) {
  if (!Array.isArray(dependencies)) {
    return dependencies?.hasOwnProperty(packageName);
  }

  return dependencies.reduce(function (prev, acc) {
    return prev || acc?.hasOwnProperty(packageName);
  }, false);
}
