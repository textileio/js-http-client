import toposort from 'toposort'
import { Link, Directory, Node, FileIndex } from '../models'

export type MillOpts = Record<string, string>

export type MillFunction = (mill: string, opts: MillOpts, form: any, headers: { [k: string]: string }) => Promise<FileIndex>

export default class SchemaMiller {
  static sortLinksByDependency(links: { [k: string]: Link }) {
    // Create an array of [ name, dependency ] for sorting
    const linkAndDepends: ReadonlyArray<[string, string]> = Object.entries(links).map(([name, link]) => {
      const pair: [string, string] = [name, link.use]
      return pair
    })
    // Sort the array into an execution order
    const sorted = [...toposort(linkAndDepends)].reverse()
    // Refill the items in the sorted array
    return (
      sorted
        // File is the original form so we don't need a method
        .filter((name: string) => {
          return name !== ':file'
        })
        // TODO: `Name` should eventually be converted to lowercase
        .map((name: string) => ({ name, link: links[name] }))
    )
  }

  static normalizeOptions(info: Node | Link) {
    const opts: MillOpts = info.opts
    // Check for top level opts
    opts.plaintext = (info.plaintext || false).toString()
    opts.pin = (info.pin || false).toString()
    return opts
  }

  static resolveDependency(method: MillOpts, payloadsByName: Directory) {
    let use

    // Convert 'use' to hash of payload
    if (method.use && method.use !== ':file') {
      // TODO: This is a hack, should use multihash JS lib in future
      use = (method.use.length === 46 && method.use.startsWith('Qm')) ?
        method.use :
        payloadsByName.files[method.use].hash
    }

    const resolvedMethod = { ...method }
    resolvedMethod.use = use || ''
    return resolvedMethod
  }

  static async mill(payload: any, node: Node, remoteMill: MillFunction): Promise<Directory> {

    const dir: Directory = { files: {} }

    // Traverse the schema and collect generated files
    if (node.mill) {
      const normal = SchemaMiller.normalizeOptions(node)
      const resolved = SchemaMiller.resolveDependency(normal, dir)
      let form
      if (resolved.use) {
        form = undefined
      } else if (typeof payload === 'function') {
        form = payload()
      } else {
        form = payload
      }
      const file = await remoteMill(node.mill, resolved, form, {})
      dir.files[':single'] = file
    } else if (node.links) {
      // Determine order
      const steps = SchemaMiller.sortLinksByDependency(node.links)
      // Send each link
      // eslint-disable-next-line no-restricted-syntax
      for (const step of steps) {
        let form
        const normal = SchemaMiller.normalizeOptions(step.link || {})
        const resolved = SchemaMiller.resolveDependency(normal, dir)
        if (resolved.use) {
          // It's an existing 'file', hash will pass as payload, so don't send file again
          form = undefined
        } else if (typeof payload === 'function') {
          form = payload()
        } else {
          form = payload
        }
        // Must be synchronous for dependencies
        const file = await remoteMill(step.link.mill, resolved, form, {})
        dir.files[step.name] = file
      }
    }
    return dir
  }
}
