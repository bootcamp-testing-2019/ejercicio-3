import * as bodyParser from 'body-parser'
import * as asyncHandler from 'express-async-handler'
import { check, sanitize, validationResult } from 'express-validator'

import {getRepository} from "typeorm"
import {ProductType} from '../../orm/entity/ProductType'
import {Units} from '../../orm/entity/Units'
import {Product} from '../../orm/entity/Product'
import {ProductsOrder} from '../../orm/entity/ProductsOrder'

const validations = [
    check('name')
        .not().isEmpty().withMessage('can not be empty')
        .trim()
        .isLength({ min: 1, max: 40 }).withMessage('must have a length between 1 and 40')
    ,
    check('lastName')
        .not().isEmpty().withMessage('can not be empty')
        .trim()
        .isLength({ min: 1, max: 40 }).withMessage('must have a length between 1 and 40')
    ,
    check('phoneNumber')
        .not().isEmpty().withMessage('can not be empty')
        .trim()
        .isLength({ min: 1, max: 40 }).withMessage('must have a length between 1 and 40')
    ,

    check('selectedProducts').isArray().isLength({ min: 1 }).withMessage('must select at least one product')
    ,
    
    sanitize('selectedProducts.*.product.id').toInt()
    ,

    sanitize('selectedProducts.*.amount').toInt()
    ,

    check('selectedProducts.*.amount').custom((amount, { req }) => {
        return amount > 0
    }).withMessage('must be > 0')
    ,

    check('selectedProducts.*.product.id').custom((id, { req }) => {
        return getRepository(ProductType).count({id: id}).then(n => {
            if (n !== 1) {
                return Promise.reject('invalid product')
            }
        })
    })
    ,

    check('selectedProducts.*.unit.id').custom((id, { req }) => {
        return getRepository(Units).count({id: id}).then(n => {
            if (n !== 1) {
                return Promise.reject('invalid unit')
            }
        })
    })
    ,
]

const controller = async (req, res, next) => {

    // Validate

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // Create the order

    const name = req.body.name
    const lastName = req.body.lastName
    const phoneNumber = req.body.phoneNumber
    const selectedProducts = req.body.selectedProducts

    const products = await createProducts(selectedProducts)

    const ordersRepository = getRepository(ProductsOrder)
    
    const order = new ProductsOrder()

    order.name = name
    order.lastName = lastName
    order.phoneNumber = phoneNumber
    order.products = products

    await ordersRepository.save(order)

    // Respond

    const productsOrder = {
        id: order.id,
        products: order.products,
        time: order.time,
    }

    res.json({ productsOrder: productsOrder })

}

async function createProducts(selectedProducts)
{
    const productTypesRepository = getRepository(ProductType)
    const unitsRepository = getRepository(Units)
    const productsRepository = getRepository(Product)

    const products = []

    for (const productRequest of selectedProducts) {
        const productType = await productTypesRepository.findOne({id: productRequest.product.id})
        const amount = productRequest.amount
        const units = await unitsRepository.findOne({id: productRequest.unit.id})

        const product = new Product()

        product.productType = productType
        product.amount = amount
        product.units = units

        await productsRepository.save(product)

        products.push(product)
    }

    return products
}


const CreateProductsOrder = validations.concat([asyncHandler(controller)])

export {CreateProductsOrder}