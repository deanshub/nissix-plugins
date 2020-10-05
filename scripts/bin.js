'use strict'
exports.__esModule = true
var cmd_ts_1 = require('cmd-ts')
var execa = require('execa')
var app = cmd_ts_1.command({
  name: 'create-plugin',
  args: {
    name: cmd_ts_1.positional({
      type: cmd_ts_1.string,
      displayName: 'Plugin name',
    }),
  },
  handler: function(_a) {
    var name = _a.name
    execa.command(
      ['node', 'scripts/generate.js', 'create-plugin', '__name__=' + name].join(
        ' ',
      ),
      {
        cwd: process.cwd(),
      },
    )
  },
})
cmd_ts_1.run(app, process.argv.slice(2))
