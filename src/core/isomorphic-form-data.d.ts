// For the purposes of js-http-client development, this is the minimal
// required interface to support FormData in Nodejs an browsers

declare module 'isomorphic-form-data' {
  export default class FormData {
    append(key: string, value: File, filename?: string): void
  }
}
