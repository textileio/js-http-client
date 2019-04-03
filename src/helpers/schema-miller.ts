import toposort from 'toposort'
import { Link, Directory, Node, Step, FileIndex } from '../models'

export interface MillOpts {
  opts: { [k: string]: string }
  // mill: string
}

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

  static normalizeOptions(schemaOpts: { [k: string]: string }) {
    const opts: MillOpts = { opts: schemaOpts }
    // Check for top level opts
    opts.opts.plaintext = (schemaOpts.plaintext || false).toString()
    opts.opts.pin = (schemaOpts.pin || false).toString()
    return opts
  }

  static resolveDependency(method: MillOpts, payloadsByName: Directory) {
    let use

    // Convert 'use' to hash of payload
    if (method.opts.use && method.opts.use !== ':file') {
      // TODO: This is a hack, should use multihash JS lib in future
      use = (method.opts.use.length === 46 && method.opts.use.startsWith('Qm')) ?
        method.opts.use :
        payloadsByName.files[method.opts.use].hash
    }

    const resolvedMethod = { ...method }
    resolvedMethod.opts.use = use || ''
    return resolvedMethod
  }

  static async mill(payload: any, node: Node, remoteMill: MillFunction): Promise<Directory> {

    const dir: Directory = { files: {} }

    // Traverse the schema and collect generated files
    if (node.mill) {
      const normal = SchemaMiller.normalizeOptions(node.opts || {})
      const resolved = SchemaMiller.resolveDependency(normal, dir)
      let headers = {}
      let form
      if (resolved.opts.use) {
        form = undefined
      } else if (typeof payload === 'function') {
        form = payload()
      } else {
        form = payload
      }
      if (form && form.getHeaders) {
        headers = form.getHeaders()
      }
      const file = await remoteMill(node.mill, resolved, form, headers)
      dir.files[':single'] = file
    } else if (node.links) {
      // Determine order
      const steps = SchemaMiller.sortLinksByDependency(node.links)
      // Send each link
      // eslint-disable-next-line no-restricted-syntax
      for (const step of steps) {
        const body = payload
        let form
        const normal = SchemaMiller.normalizeOptions(step.link.opts || {})
        const resolved = SchemaMiller.resolveDependency(normal, dir)
        let headers = {}

        if (resolved.opts.use) {
          // It's a file, the hash will pass as the payload, don't send file again
          form = undefined
        } else if (typeof body === 'function') {
          form = body()
        } else {
          form = body
        }

        if (form && form.getHeaders) {
          headers = form.getHeaders()
        }

        // Must be synchronous for dependencies
        const file = await remoteMill(step.link.mill, resolved, form, headers)
        dir.files[step.name] = file
      }
    }
    return dir
  }
}
