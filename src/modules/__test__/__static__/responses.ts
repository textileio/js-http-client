import { Peer, Summary, Block, Text, Like, Comment, User, Contact, CafeSession, TextList } from '../../../models'

export const user: User = {
  address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
  name: 'username',
  avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
}

export const ignore: Block = {
  author: '12D3KooWJKPeAzZ6Sig3p1BwMdz5aMmnKhhgEdgJqn4wd1dsTMZB',
  date: '2019-04-01T20:54:46.359206Z',
  id: 'id',
  body: '',
  parents: [
    'id'
  ],
  target: 'ignore-target',
  thread: 'thread',
  type: Block.BlockType.IGNORE,
  user
}

export namespace account {
  export const contact: Contact = {
    address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
    name: 'username',
    avatar: 'avatar',
    peers: [],
    threads: []
  }
  export const address = 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW'
  export const seed = 'SY4uXRezeDqXL6nhYLfJPBVTyhqJuFBGYYGqdumHT9bCNgEd'
}

export namespace cafes {
  export const add: CafeSession = {
    access: 'access',
    cafe: {
      address: 'address',
      api: 'v0',
      node: '0.1.10',
      peer: 'peer',
      protocol: '/textile/cafe/1.0.0',
      swarm: [
        '/ip4/xx.xxx.xxx.xx/tcp/4001',
        '/ip4/xx.xxx.xxx.xx/tcp/8081/ws'
      ],
      url: 'http://xx.xxx.xxx.xx:40601'
    },
    exp: '2019-04-25T16:53:32.525867505Z',
    id: 'id',
    refresh: 'refresh',
    rexp: '2019-05-23T16:53:32.525867505Z',
    subject: 'subject',
    type: 'JWT'
  }
}

export namespace comments {
  export const add: Comment = {
    body: 'comment',
    date: '2019-03-28T17:27:08.767878Z',
    id: 'id',
    user,
    target: {
      block: 'block',
      thread: 'thread',
      payload: {}
    }
  }
}

export namespace likes {
  export const add: Like = {
    date: '2019-03-28T17:35:14.718284Z',
    id: 'id',
    user,
    target: {
      block: 'block',
      thread: 'thread',
      payload: {}
    }
  }
}

export namespace messages {
  export const add: Text = {
    block: 'block',
    body: 'message',
    comments: [],
    date: '2019-03-28T17:24:25.796298Z',
    likes: [],
    user
  }
  export const list: TextList = {
    items: [
      messages.add
    ]
  }
}

export namespace utils {
  export const summary: Summary = {
    id: '12D3KooWJKPeAzZ6Sig3p1BwMdz5aMmnKhhgEdgJqn4wd1dsTMZB',
    address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
    thread_count: 0,
    account_peer_count: 0,
    files_count: 0,
    contact_count: 0
  }
}

export namespace profile {
  export const get: Peer = {
    ...user,
    id: 'id',
    inboxes: [],
    created: '2019-04-01T20:54:46.359206Z',
    updated: '2019-04-01T20:54:46.359206Z'
  }
}
