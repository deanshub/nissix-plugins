import { command, run, string, positional } from 'cmd-ts'
import execa from 'execa'
// import { generateTemplateFiles, CaseConverterEnum } from 'generate-template-files'

const app = command({
  name: 'create-plugin',
  args: {
    name: positional({ type: string, displayName: 'Plugin name' }),
  },
  handler: ({ name }) => {
    // generateTemplateFiles([
    //   {
    //     option: '',
    //     defaultCase: CaseConverterEnum.LowerCase,
    //     entry: {
    //       folderPath: './scripts/template/',
    //     },
    //     // stringReplacers: [],
    //     dynamicReplacers: [
    //       {
    //         slot: '__name__',
    //         slotValue: name,
    //       },
    //     ],
    //     output: {
    //       path: './plugins/__name__/',
    //       overwrite: true,
    //     },
    //   },
    // ])

    execa.commandSync(
      `ts-node scripts/generate.ts create-plugin __name__=${name}`,
      {
        cwd: process.cwd(),
        stdio: 'inherit',
      },
    )
  },
})

run(app, process.argv.slice(2))
