import { Contact } from '../../../models'
export namespace contacts {
  export const search = {
    id: 'id',
    date: '2019-03-20T20:29:37.981888051Z',
    value: {
      '@type': '/Contact',
      'address': 'address',
      'name': 'username',
      'avatar': 'avatar',
      'peers': [
        {
          id: 'id',
          address: 'address',
          name: 'username',
          avatar: 'avatar',
          inboxes: [
            {
              peer: 'peer',
              address: 'address',
              api: 'v0',
              protocol: '/textile/cafe/1.0.0',
              node: '1.0.0-rc33',
              url: 'http://xx.xxx.xxx.xx:40601',
              swarm: [
                '/ip4/xx.xxx.xxx.xx/tcp/4001'
              ]
            },
            {
              peer: 'peer',
              address: 'address',
              api: 'v0',
              protocol: '/textile/cafe/1.0.0',
              node: '1.0.0-rc28',
              url: 'http://127.0.0.1:42601',
              swarm: [
                '/ip4/127.0.0.1/tcp/5789'
              ]
            }
          ],
          created: '2019-01-18T16:17:35.902912Z',
          updated: '2019-03-20T20:29:37.981888051Z'
        }
      ]
    }
  }
  export const contact: Contact = { ...contacts.search.value, threads: [] }
}
