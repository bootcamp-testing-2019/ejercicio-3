import {get} from '../requests'

/**
 * Endpoint spec:
 *      https://trello.com/c/jgZIztMg/1-get-apiv1-units
 */
describe('GET /apiv1/units endpoint', () => {
    test('returns 200', async (done) => {
        const response = await get('/apiv1/units')

        expect(response.statusCode).toBe(200)

        done()
    })

    test('returns the available units', async (done) => {
        const response = await get('/apiv1/units')

        expect(response.body).toEqual({
            "units": expect.arrayContaining([
                {"id": 1, "name": "unidades"},
                {"id": 2, "name": "docena"},
                {"id": 3, "name": "gr"},
                {"id": 4, "name": "kg"}
            ])
        })

        done()
    })
})