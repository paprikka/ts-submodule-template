import makeClient from './index'
import fetch from 'node-fetch'
jest.mock('node-fetch')

describe('index', () => {
    it('should be factory a function', () => {
        expect(typeof makeClient).toBe('function')
        expect(typeof makeClient('http://foo.bar')).toBe('function')
    })

    it('should fire a message request to a specified endpoint along with correct type', async () => {
        fetch.mockImplementationOnce( () => Promise.resolve('success') )

        const apiURL = 'http://foo.bar/RANDOM_API_KEY'
        const message = {
            hello: 'world'
        }
        const channel = 'example:channel'

        expect(fetch).not.toHaveBeenCalled()
        const send = makeClient(apiURL)
        expect(fetch).not.toHaveBeenCalled()

        const result = await send(channel, message)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch.mock.calls[0][0]).toBe(apiURL)
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
            channel,
            message
        })

        expect(result).toEqual('success')

    })

    it('should throw if missing apiURL', async () => {
        const error = new Error('Missing apiURL.')
        expect(() => makeClient()).toThrow(error)
    })

})