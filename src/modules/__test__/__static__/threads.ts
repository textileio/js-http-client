export const threads = {
  add: {
    block_count: 1,
    head: 'head',
    head_block: {
      author: '12D3KooWJKPeAzZ6Sig3p1BwMdz5aMmnKhhgEdgJqn4wd1dsTMZB',
      date: '2019-03-28T17:21:44.405854Z',
      id: 'id',
      parents: [],
      thread: 'thread',
      type: 'JOIN',
      user: {
        address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
        name: 'P4RaCnW'
      }
    },
    id: 'thread',
    initiator: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
    key: '1234',
    members: [
      'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW'
    ],
    name: 'test',
    peer_count: 1,
    schema: 'QmeVa8vUbyjHaYaeki8RZRshsn3JeYGi8QCnLCWXh6euEh',
    schema_node: {
      links: {
        large: {
          mill: '/image/resize',
          opts: {
            quality: '80',
            width: '800'
          },
          use: ':file'
        },
        small: {
          mill: '/image/resize',
          opts: {
            quality: '80',
            width: '320'
          },
          use: ':file'
        },
        thumb: {
          mill: '/image/resize',
          opts: {
            quality: '80',
            width: '100'
          },
          pin: true,
          use: 'large'
        }
      },
      name: 'media',
      pin: true
    },
    sharing: 'SHARED',
    sk: 'secret_key',
    state: 'LOADED',
    type: 'OPEN'
  }
}
