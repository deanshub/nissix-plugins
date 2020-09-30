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
        question: "Insert plugin name (will be followed by 'nissix-')",
        slot: '__name__',
      },
    ],
    output: {
      path: './plugins/__name__/',
      overwrite: true,
    },
  },
])
