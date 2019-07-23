import {getRepository} from 'typeorm'
import {initializeConnection, post} from '../requests'
import {ProductsOrder} from '../../orm/entity/ProductsOrder'
import {Product} from '../../orm/entity/Product'

/**
 * Endpoint spec:
 *      https://trello.com/c/sQic19Q2/3-post-apiv1-shopping-cart-create-order
 */
describe('POST /apiv1/shopping-cart/create-order endpoint', () => {
    let app = undefined

    const validParams = {
        "name": "John",
        "lastName": "Doe",
        "phoneNumber": "123456",
        "selectedProducts": [
            {
                "product": {
                    "id": 5,
                    "name": "Milanesas",
                },
                "amount": 1,
                "unit": {
                    "id": 4,
                    "name": "kg",
                }
            }
        ]
    }

    beforeAll( async (done) => {
        await initializeConnection()

        done()
    })

    beforeEach( async (done) => {
        await resetProductsOrders()

        done()
    })

    afterEach( async (done) => {
        await resetProductsOrders()

        done()
    })

    describe('with valid params', () => {
        test('returns 200', async (done) => {
            const response = await post('/apiv1/shopping-cart/create-order', validParams)

            expect(response.statusCode).toBe(200)

            done()
        })

        test('returns the created order', async (done) => {
            const response = await post('/apiv1/shopping-cart/create-order', validParams)

            expect(response.body).toEqual({
                "productsOrder": {
                    "id": expect.anything(),
                    "products": [
                        {
                            "id": expect.anything(),
                            "productType": {
                                "name": "Milanesas",
                                "id": 5
                            },
                            "amount": 1,
                            "units": {
                                "name": "kg",
                                "id": 4
                            },
                        }
                    ],
                    "time": expect.stringMatching(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d[.]\d\d\dZ/)
                }
            })

            done()
        })

        test('stores the created order', async (done) => {
            const response = await post('/apiv1/shopping-cart/create-order', validParams)

            const orders = await getAllProductsOrders()

            expect(orders).toEqual([
                {
                    id: 1,
                    time: expect.anything(),
                    name: 'John',
                    lastName: 'Doe',
                    phoneNumber: '123456',
                    products: [
                        {
                            id: 1,
                            productType: {
                                id: 5,
                                name: 'Milanesas',
                            },
                            amount: 1,
                            units: {
                                id: 4,
                                name: 'kg',
                            }
                        }
                    ]
                }
            ])

            done()
        })
    })

    describe('with invalid params', () => {
        let params

        beforeEach( (done) => {
            params = Object.assign({}, validParams)

            done()
        })

        const invalidations = [
            // name
            {
                title: 'with a missing name',
                parameter: 'name',
                invalidValue: undefined,
                errors: [
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "can not be empty",
                    },
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with an empty name',
                parameter: 'name',
                invalidValue: '',
                errors: [
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "can not be empty",
                        "value": "",
                    },
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a blank name',
                parameter: 'name',
                invalidValue: '   ',
                errors: [
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a name too long',
                parameter: 'name',
                invalidValue: 'a'.repeat(41),
                errors: [
                    {
                        "param": "name",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": 'a'.repeat(41),
                    },
                ],
            },
            // lastName
            {
                title: 'with a missing lastName',
                parameter: 'lastName',
                invalidValue: undefined,
                errors: [
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "can not be empty",
                    },
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with an empty lastName',
                parameter: 'lastName',
                invalidValue: '',
                errors: [
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "can not be empty",
                        "value": "",
                    },
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a blank lastName',
                parameter: 'lastName',
                invalidValue: '   ',
                errors: [
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a lastName too long',
                parameter: 'lastName',
                invalidValue: 'a'.repeat(41),
                errors: [
                    {
                        "param": "lastName",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": 'a'.repeat(41),
                    },
                ],
            },
            // phoneNumber
            {
                title: 'with a missing phoneNumber',
                parameter: 'phoneNumber',
                invalidValue: undefined,
                errors: [
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "can not be empty",
                    },
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with an empty phoneNumber',
                parameter: 'phoneNumber',
                invalidValue: '',
                errors: [
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "can not be empty",
                        "value": "",
                    },
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a blank phoneNumber',
                parameter: 'phoneNumber',
                invalidValue: '   ',
                errors: [
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": "",
                    },
                ],
            },
            {
                title: 'with a phoneNumber too long',
                parameter: 'phoneNumber',
                invalidValue: 'a'.repeat(41),
                errors: [
                    {
                        "param": "phoneNumber",
                        "location": "body",
                        "msg": "must have a length between 1 and 40",
                        "value": 'a'.repeat(41),
                    },
                ],
            },
            // selectedProducts
            {
                title: 'with no products selected',
                parameter: 'selectedProducts',
                invalidValue: [],
                errors: [
                    {
                        "param": "selectedProducts",
                        "location": "body",
                        "msg": "must select at least one product",
                        "value": [],
                    },
                ],
            },
            {
                title: 'with an invalid product',
                parameter: 'selectedProducts',
                invalidValue: [
                    {
                        product: {
                            id: 100
                        },
                        amount: 1,
                        unit: {
                            id: 4,
                        }
                    }
                ],
                errors: [
                    {
                        "param": "selectedProducts[0].product.id",
                        "location": "body",
                        "msg": "invalid product",
                        "value": 100,
                    },
                ],
            },
            {
                title: 'with an amount < 1',
                parameter: 'selectedProducts',
                invalidValue: [
                    {
                        product: {
                            id: 5,
                        },
                        amount: 0,
                        unit: {
                            id: 4,
                        }
                    }
                ],
                errors: [
                    {
                        "param": "selectedProducts[0].amount",
                        "location": "body",
                        "msg": "must be > 0",
                        "value": 0,
                    },
                ],
            },
            {
                title: 'with an invalid product',
                parameter: 'selectedProducts',
                invalidValue: [
                    {
                        product: {
                            id: 5
                        },
                        amount: 1,
                        unit: {
                            id: 100,
                        }
                    }
                ],
                errors: [
                    {
                        "param": "selectedProducts[0].unit.id",
                        "location": "body",
                        "msg": "invalid unit",
                        "value": 100,
                    },
                ],
            },
        ]

        invalidations.forEach( (invalidation) => {
            test(invalidation.title, async (done) => {
                params[invalidation.parameter] = invalidation.invalidValue

                const response = await post('/apiv1/shopping-cart/create-order', params)

                expect(response.statusCode).toBe(422)

                expect(response.body).toEqual({
                    "errors": invalidation.errors
                })

                const orders = await getAllProductsOrders()

                expect(orders).toEqual([])

                done()
            })
        })
    })

    async function getAllProductsOrders() {
        const productsOrderRepository = getRepository(ProductsOrder)

        return await productsOrderRepository.find({
                relations: ['products', 'products.productType', 'products.units'],
                order: {id: 'ASC'},
            })
    }

    async function resetProductsOrders() {
        await getRepository(Product).clear()
        await getRepository(ProductsOrder).clear()
    }

})