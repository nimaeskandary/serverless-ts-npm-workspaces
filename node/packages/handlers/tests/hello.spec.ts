import { handler } from '@/handlers/Hello'

describe('hello', () => {
    it('returns 200', () => {
        expect(handler()).resolves.toEqual(200)
    })
})
