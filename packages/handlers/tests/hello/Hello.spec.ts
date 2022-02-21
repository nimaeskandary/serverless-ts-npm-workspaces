import { helloHandler } from '@serverless-ts-npm-workspaces/handlers'

describe('hello', () => {
    it('returns 200', async () => {
        await expect(helloHandler({ headers: {} }, {})).resolves.toEqual({ statusCode: 200 })
    })
})
