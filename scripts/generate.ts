import {
  generateTemplateFilesCommandLine,
  CaseConverterEnum,
} from 'generate-template-files'

generateTemplateFilesCommandLine([
  {
    option: 'Create plugin',
    defaultCase: CaseConverterEnum.LowerCase,
    entry: {
      folderPath: './scripts/template/',
    },
    stringReplacers: ['__name__'],
    output: {
      path: './plugins/__name__/',
      overwrite: true,
    },
  },
])
