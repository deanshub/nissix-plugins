import { isPackageInstalled } from '../src/pluginUtils'

describe('isPackageInstalled tests', () => {
  it('Should return false if dependencies are undefined', () => {
    const actual = isPackageInstalled(undefined, 'packageName')
    expect(actual).toBeFalsy()
  })

  it('Should return false if dependencies are an empty array', () => {
    const actual = isPackageInstalled([], 'packageName')
    expect(actual).toBeFalsy()
  })

  it('Should return false if the package is not in the collection', () => {
    const actual = isPackageInstalled({}, 'packageName')
    expect(actual).toBeFalsy()
  })

  it('Should return false if the package is not in the array of collections', () => {
    const actual = isPackageInstalled([{}], 'packageName')
    expect(actual).toBeFalsy()
  })

  it('Should return true if the package is in the collection', () => {
    const actual = isPackageInstalled({ packageName: '1.0.0' }, 'packageName')
    expect(actual).toBeTruthy()
  })

  it('Should return true if the package is in the array of collections', () => {
    const actual = isPackageInstalled(
      [{}, { packageName: '1.0.0' }],
      'packageName',
    )
    expect(actual).toBeTruthy()
  })
})
