export const config = {
  API: {
    HTTPHeaders: {
      'Access-Control-Allow-Headers': [
        'Content-Type',
        'Method',
        'X-Textile-Args',
        'X-Textile-Opts',
        'X-Requested-With'
      ],
      'Access-Control-Allow-Methods': [
        'GET',
        'POST',
        'DELETE',
        'OPTIONS'
      ],
      'Access-Control-Allow-Origin': [
        'http://localhost:*',
        'http://127.0.0.1:*'
      ],
      'Server': [
        'go-textile/0.0.0'
      ]
    },
    SizeLimit: 0
  },
  Account: {
    Address: 'P4RaCnWZYhKCztWK7mii1WQZmXVAtBVdRAyBU6Em51agxTfW',
    Thread: 'thread'
  },
  Addresses: {
    API: '127.0.0.1:40600',
    CafeAPI: '127.0.0.1:40601',
    Gateway: '127.0.0.1:5050'
  },
  Cafe: {
    Client: {
      Mobile: {
        P2PWireLimit: 0
      }
    },
    Host: {
      NeighborURL: '',
      Open: false,
      PublicIP: '',
      SizeLimit: 0,
      URL: ''
    }
  },
  IsMobile: false,
  IsServer: true,
  Logs: {
    LogToDisk: true
  },
  Threads: {
    Defaults: {
      ID: ''
    }
  }
}
