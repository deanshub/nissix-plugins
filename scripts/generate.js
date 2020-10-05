const { generateTemplateFilesCommandLine } = require('generate-template-files')
generateTemplateFilesCommandLine([
  {
    option: 'Create plugin',
    defaultCase: '(lowercase)',
    entry: {
      folderPath: './scripts/template/',
    },
    stringReplacers: [
      {
        slot: '__name__',
      },
    ],
    output: {
      path: './plugins/__name__/',
      overwrite: true,
    },
  },
])
