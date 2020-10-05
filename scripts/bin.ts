import { command, run, string, positional } from 'cmd-ts'
import * as execa from 'execa'

const app = command({
  name: 'create-plugin',
  args: {
    name: positional({ type: string, displayName: 'Plugin name' }),
  },
  handler: ({ name }) => {
    execa.command(
      ['node', 'scripts/generate.js', 'create-plugin', `__name__=${name}`].join(
        ' ',
      ),
      {
        cwd: process.cwd(),
      },
    )
  },
})

run(app, process.argv.slice(2))
