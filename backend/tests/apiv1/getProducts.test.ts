import {get} from '../requests'

/**
 * Endpoint spec:
 *      https://trello.com/c/Po7FF8IU/2-get-apiv1-products
 */
describe('GET /apiv1/products endpoint', () => {
    test('returns 200', async (done) => {
        const response = await get('/apiv1/products')

        expect(response.statusCode).toBe(200)

        done()
    })

    test('returns the available units', async (done) => {
        const response = await get('/apiv1/products')

        expect(response.body).toEqual({
            products: expect.arrayContaining([
                { 
                    name: 'Tomates',
                    id: 1,
                    units: expect.arrayContaining([
                        { id: 1, name: 'unidades' },
                        { id: 3, name: 'gr' },
                        { id: 4, name: 'kg' },
                    ])
                },
                { 
                    name: 'Cebollas',
                    id: 2,
                    units: expect.arrayContaining([
                        { id: 1, name: 'unidades' },
                        { id: 3, name: 'gr' },
                        { id: 4, name: 'kg' },
                    ])
                },
                { 
                    name: 'Lechuga',
                    id: 3,
                    units: expect.arrayContaining([
                        { id: 1, name: 'unidades' },
                        { id: 3, name: 'gr' },
                        { id: 4, name: 'kg' },
                    ])
                },
                { 
                    name: 'Asado',
                    id: 4,
                    units: expect.arrayContaining([
                        { id: 3, name: 'gr' },
                        { id: 4, name: 'kg' }
                    ])
                },
                { 
                    name: 'Milanesas',
                    id: 5,
                    units: expect.arrayContaining([
                        { id: 1, name: 'unidades' },
                        { id: 3, name: 'gr' },
                        { id: 4, name: 'kg' },
                    ])
                },
                { 
                    name: 'Huevos',
                    id: 6,
                    units: expect.arrayContaining([
                        { id: 2, name: 'docena' },
                    ])
                },
                {
                    name: 'Ajo',
                    id: 7,
                    units: expect.arrayContaining([
                        { id: 1, name: 'unidades' }
                    ])
                },
            ])
        })

        done()
    })
})