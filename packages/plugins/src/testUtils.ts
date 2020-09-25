import path from 'path'
import globby from 'globby'
import readPkg from 'read-pkg'
import { Plugin } from './types'

export async function getPlugins(): Promise<Plugin[]> {
  const pluginManifestPaths = await globby(['./plugins/*/package.json'], {
    cwd: process.cwd(),
  })
  return Promise.all(
    pluginManifestPaths.map(async (pkgJsonPath) => {
      const pluginPath = path.dirname(pkgJsonPath)
      const pkg = await readPkg({ cwd: pluginPath })
      return { manifest: pkg, dir: pluginPath }
    }),
  )
}

export function getPluginsSync(): Plugin[] {
  const pluginManifestPaths = globby.sync(['../../plugins/*/package.json'])
  return pluginManifestPaths.map((pkgJsonPath) => {
    const pluginPath = path.dirname(pkgJsonPath)
    const pkg = readPkg.sync({ cwd: pluginPath })
    return { manifest: pkg, dir: pluginPath }
  })
}
