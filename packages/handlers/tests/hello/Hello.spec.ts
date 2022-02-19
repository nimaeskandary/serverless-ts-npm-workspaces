import { helloHandler } from '@/handlers/hello/Hello'

describe('hello', () => {
    it('returns 200', async () => {
        await expect(helloHandler({headers: {}}, {})).resolves.toEqual({statusCode: 200})
    })
})
