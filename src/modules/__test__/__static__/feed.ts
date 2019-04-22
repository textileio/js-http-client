import { FeedItemList } from '../../../models'

export const stacks: FeedItemList = {
  items: [
    {
      block: 'QmRRYCEQMuSefa6ZtCLQ89QsqZaEBfsXikj2UzKRvcCkvY',
      thread: '12D3KooWGdz1WeHJPRv8fowwPWrqWPdUfwWUQyEp4NeRu4nyHXLH',
      payload: {
        '@type': '/Like',
        'id': 'QmRRYCEQMuSefa6ZtCLQ89QsqZaEBfsXikj2UzKRvcCkvY',
        'date': '2019-04-01T21:43:37.116893Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        },
        'target': {
          block: 'QmbU3JkMqnYHm9uv9VmBJLCgdB4gZeb6ZgUEW9G4RnmQxQ',
          thread: '12D3KooWGdz1WeHJPRv8fowwPWrqWPdUfwWUQyEp4NeRu4nyHXLH',
          payload: {
            '@type': '/Text',
            'block': 'QmbU3JkMqnYHm9uv9VmBJLCgdB4gZeb6ZgUEW9G4RnmQxQ',
            'date': '2019-03-28T17:24:25.796298Z',
            'user': {
              address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
              name: 'displayname',
              avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
            },
            'body': 'message'
          }
        }
      }
    },
    {
      block: 'QmeU7xSPq6Bewh6PdwHqGHhoErFH1UBQV5Aqb7VYP9ugey',
      thread: '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL',
      payload: {
        '@type': '/Files',
        'block': 'QmeU7xSPq6Bewh6PdwHqGHhoErFH1UBQV5Aqb7VYP9ugey',
        'target': 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5',
        'date': '2019-04-01T21:27:37.422127Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        },
        'files': [
          {
            links: {
              large: {
                mill: '/image/resize',
                checksum: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                opts: 'Atk8eCEgX98dPBCieRvUUBkH1nA7YiX6AxK1ZjbA6mY',
                hash: 'QmVhJPrbb6iD9BYkUcqyDepuAw1wGsudhZLKapfZGCuhKG',
                media: 'image/png',
                size: '7270',
                added: '2019-04-01T21:27:37.378108Z',
                meta: {
                  height: 128,
                  width: 128
                },
                targets: [
                  'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
                ]
              },
              small: {
                mill: '/image/resize',
                checksum: '5i7tM447RozmhG1zbYvWGb8UXRRa57DSKJAJSLiUsSYJ',
                source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                opts: 'Av7wdZtZ5P8rWQtuTkUPQ8iBmRK1PyfxPcVeDtAjb2uR',
                hash: 'QmY2cqoiCNwNcf6Sf6tEUbA76V64zkcRbkdB8JRAWYafH2',
                media: 'image/png',
                size: '8125',
                added: '2019-04-01T21:27:37.387214Z',
                meta: {
                  height: 100,
                  width: 100
                },
                targets: [
                  'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
                ]
              }
            }
          }
        ],
        'threads': [
          '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL'
        ]
      }
    },
    {
      block: 'QmU8GrBr3zNmqcHCP3UhMEueiZSEg1wypQ5E61t84t7TsV',
      thread: '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL',
      payload: {
        '@type': '/Join',
        'block': 'QmU8GrBr3zNmqcHCP3UhMEueiZSEg1wypQ5E61t84t7TsV',
        'date': '2019-04-01T21:27:37.363373Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        }
      }
    }
  ],
  count: 3,
  next: 'next'
}

export const chrono: FeedItemList = {
  items: [
    {
      block: 'QmRRYCEQMuSefa6ZtCLQ89QsqZaEBfsXikj2UzKRvcCkvY',
      thread: 'thread',
      payload: {
        '@type': '/Like',
        'id': 'like-id',
        'date': '2019-04-01T21:43:37.116893Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        },
        'target': {
          block: 'QmbU3JkMqnYHm9uv9VmBJLCgdB4gZeb6ZgUEW9G4RnmQxQ',
          thread: 'thread',
          payload: {
            '@type': '/Text',
            'block': 'QmbU3JkMqnYHm9uv9VmBJLCgdB4gZeb6ZgUEW9G4RnmQxQ',
            'date': '2019-03-28T17:24:25.796298Z',
            'user': {
              address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
              name: 'displayname',
              avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
            },
            'body': 'message'
          }
        }
      }
    },
    {
      block: 'QmeU7xSPq6Bewh6PdwHqGHhoErFH1UBQV5Aqb7VYP9ugey',
      thread: '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL',
      payload: {
        '@type': '/Files',
        'block': 'QmeU7xSPq6Bewh6PdwHqGHhoErFH1UBQV5Aqb7VYP9ugey',
        'target': 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5',
        'date': '2019-04-01T21:27:37.422127Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        },
        'files': [
          {
            links: {
              large: {
                mill: '/image/resize',
                checksum: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                opts: 'Atk8eCEgX98dPBCieRvUUBkH1nA7YiX6AxK1ZjbA6mY',
                hash: 'QmVhJPrbb6iD9BYkUcqyDepuAw1wGsudhZLKapfZGCuhKG',
                media: 'image/png',
                size: '7270',
                added: '2019-04-01T21:27:37.378108Z',
                meta: {
                  height: 128,
                  width: 128
                },
                targets: [
                  'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
                ]
              },
              small: {
                mill: '/image/resize',
                checksum: '5i7tM447RozmhG1zbYvWGb8UXRRa57DSKJAJSLiUsSYJ',
                source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
                opts: 'Av7wdZtZ5P8rWQtuTkUPQ8iBmRK1PyfxPcVeDtAjb2uR',
                hash: 'QmY2cqoiCNwNcf6Sf6tEUbA76V64zkcRbkdB8JRAWYafH2',
                media: 'image/png',
                size: '8125',
                added: '2019-04-01T21:27:37.387214Z',
                meta: {
                  height: 100,
                  width: 100
                },
                targets: [
                  'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
                ]
              }
            }
          }
        ],
        'threads': [
          '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL'
        ]
      }
    },
    {
      block: 'QmU8GrBr3zNmqcHCP3UhMEueiZSEg1wypQ5E61t84t7TsV',
      thread: '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL',
      payload: {
        '@type': '/Join',
        'block': 'QmU8GrBr3zNmqcHCP3UhMEueiZSEg1wypQ5E61t84t7TsV',
        'date': '2019-04-01T21:27:37.363373Z',
        'user': {
          address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
          name: 'displayname',
          avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
        }
      }
    }
  ],
  count: 3,
  next: 'next'
}
