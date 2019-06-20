import { streamHandler } from '../handlers'
import { ReadableStream } from 'web-streams-polyfill/ponyfill'
import { TextEncoder } from 'util'

describe('streamHandler', () => {
  const mockStream = new ReadableStream<ArrayBuffer>()
  const mockRead = jest.fn()

  mockStream.getReader = jest.fn().mockReturnValue({
    read: mockRead
  })
  const encoder = new TextEncoder()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('backward compatible with nodejs <= 11', async () => {
    // the test should pass in ci with older/new nodejs versions
    expect.assertions(1)
    const data = {data: 'can you see me?'}
    mockRead
      .mockResolvedValueOnce({ done: false, value: encoder.encode(JSON.stringify(data)) })
      .mockResolvedValueOnce({ done: true })
    const result = await streamHandler(mockStream).getReader().read()
    expect(result.value).toEqual(data)
  })
})
