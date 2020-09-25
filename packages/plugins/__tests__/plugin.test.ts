import { getPluginsSync } from '../src/testUtils'

describe('Plugin configured properly', () => {
  const plugins = getPluginsSync()

  plugins.forEach((plugin) => {
    test(`${plugin.manifest.name} should have bin defined`, async () => {
      expect(plugin.manifest).toHaveProperty('bin')
      expect(plugin.manifest?.bin).toBeDefined()
    })
    // TODO expect every directory in plugins to conttain package.json
  })
})
