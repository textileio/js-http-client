import { FilesList, Files, Keys, Directory } from '../../../models'

export namespace files {
  export const get: Files = {
    block: 'QmeU7xSPq6Bewh6PdwHqGHhoErFH1UBQV5Aqb7VYP9ugey',
    comments: [],
    caption: 'caption',
    date: '2019-04-01T21:27:37.422127Z',
    files: [
      {
        index: 0,
        file: {
          name: '',
          added: '',
          checksum: '',
          hash: '',
          key: '',
          media: '',
          meta: {},
          mill: '',
          opts: '',
          size: '',
          source: '',
          targets: []
        },
        links: {
          large: {
            name: '',
            added: '2019-04-01T21:27:37.378108Z',
            checksum: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
            hash: 'QmVhJPrbb6iD9BYkUcqyDepuAw1wGsudhZLKapfZGCuhKG',
            key: '',
            media: 'image/png',
            meta: {
              height: 128,
              width: 128
            },
            mill: '/image/resize',
            opts: 'Atk8eCEgX98dPBCieRvUUBkH1nA7YiX6AxK1ZjbA6mY',
            size: '7270',
            source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
            targets: [
              'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
            ]
          },
          small: {
            name: '',
            added: '2019-04-01T21:27:37.387214Z',
            checksum: '5i7tM447RozmhG1zbYvWGb8UXRRa57DSKJAJSLiUsSYJ',
            hash: 'QmY2cqoiCNwNcf6Sf6tEUbA76V64zkcRbkdB8JRAWYafH2',
            key: '',
            media: 'image/png',
            meta: {
              height: 100,
              width: 100
            },
            mill: '/image/resize',
            opts: 'Av7wdZtZ5P8rWQtuTkUPQ8iBmRK1PyfxPcVeDtAjb2uR',
            size: '8125',
            source: 'B9RebNwLPTXQJymnjEJsYsFuS1dAuJBpBnHT1sB2LLVQ',
            targets: [
              'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5'
            ]
          }
        }
      }
    ],
    likes: [],
    target: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5',
    threads: [
      '12D3KooWRW4Ewc1tYCLA2xj6crywHoCxxBngenJNUsPyzHGm3meL'
    ],
    user: {
      address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
      avatar: 'QmUMWopyRDwZYJznyyhp1TmbAJhLV3z2Xe9dSeqr6LNvV5',
      name: 'username'
    }
  }
  export const list: FilesList = {
    items: [files.get]
  }
  export const dir: Directory = {
    files: {...files.get.files[0].links}
  }
  export const keys: Keys = {
    files: {
      '/0/large/': 'blah',
      '/0/small/': 'blah'
    }
  }
}
