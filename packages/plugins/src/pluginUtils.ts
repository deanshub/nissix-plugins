import path from 'path'
import execa from 'execa'
import hasYarn from 'has-yarn'
import fs from 'fs-extra'
import globby from 'globby'
import readPkg from 'read-pkg'

type DependencyType = 'production' | 'development' | 'peer'
type DependencyTypeFlag = '' | ' -D' | ' -P'

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
    return Promise.all(
        paths.map(async (pkgJsonPath) => {
            const pkgPath = path.dirname(pkgJsonPath)
            const pkg = await readPkg({ cwd: pkgPath })
            return { content: pkg, path: pkgPath }
        }),
    )
}
