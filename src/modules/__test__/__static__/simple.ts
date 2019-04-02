export const schema = {
    name: 'media',
    pin: true,
    plaintext: false,
    mill: 'skip',
    opts: {},
    json_schema: {},
    links: {
        thumb: {
            use: 'large',
            pin: true,
            plaintext: false,
            mill: '/image/resize',
            opts: {
                quality: '80',
                width: '100'
            },
            json_schema: {}
        },
        large: {
            use: ':file',
            pin: false,
            plaintext: false,
            mill: '/image/resize',
            opts: {
                quality: '80',
                width: '800'
            },
            json_schema: {}
        },
        small: {
            use: ':file',
            pin: false,
            plaintext: false,
            mill: '/image/resize',
            opts: {
                quality: '80',
                width: '320'
            },
            json_schema: {}
        }
    }
}
