const Cache = require('./classes/Cache')
const CacheService = require('./CacheService')

describe('CacheService', () => {
  it('it should return the new instance of classes.Cache', () => {
    expect(CacheService.getDocumentationCache()).toBeInstanceOf(Cache)
    expect(CacheService.getScriptCache()).toBeInstanceOf(Cache)
    expect(CacheService.getUserCache()).toBeInstanceOf(Cache)
  })
})
