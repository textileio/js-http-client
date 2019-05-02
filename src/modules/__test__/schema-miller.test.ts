import SchemaMiller from '../../helpers/schema-miller'
// import { Directory } from '../../models'
import { schema } from './__static__/simple'

const hash = 'QMABCDDDKLSFDKLSDFLKSDF34523LKSSDDLFK23LK43K46'

describe('simple schema', () => {
  it('should be sorted by dependencies', () => {
    const node = schema
    const sorted = SchemaMiller.sortLinksByDependency(node.links)

    expect(sorted[2].name).toEqual('thumb')
  })

  it.skip('should have normalized options', () => {
    const { links: { thumb } } = schema
    const node = thumb
    const normalized = SchemaMiller.normalizeOptions(node)

    expect(normalized.pin).toEqual(true)
    expect(normalized.plaintext).toEqual(false)
  })

  // it('should have resolved use', () => {
  //   const { links: { large, thumb } } = response
  //   const payloadsByName: Directory = { files: { large: { hash } } }

  //   const resolvedOne = SchemaMiller.resolveDependency(large, payloadsByName)
  //   const resolvedTwo = SchemaMiller.resolveDependency(thumb, payloadsByName)

  //   expect(resolvedOne.opts.use).toEqual(hash)
  //   expect(resolvedTwo.opts.use).toEqual(hash)
  // })
})
