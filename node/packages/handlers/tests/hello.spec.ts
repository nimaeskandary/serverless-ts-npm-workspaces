import { handler } from 'handlers/src/hello'

describe('hello', () => {
    it('returns 200', () => {
        expect(handler()).resolves.toEqual(200)
    })
})
