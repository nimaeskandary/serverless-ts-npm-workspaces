import { handler } from 'handlers/hello'

describe('hello', () => {
    it('returns 200', () => {
        expect(handler()).resolves.toEqual(200)
    })
})
