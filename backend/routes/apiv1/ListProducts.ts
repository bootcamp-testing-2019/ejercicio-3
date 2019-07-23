import * as asyncHandler from 'express-async-handler'
import {getRepository} from "typeorm"
import {ProductType} from '../../orm/entity/ProductType'

const ListProducts = asyncHandler(async (req, res, next) => {

    const productTypesRepository = getRepository(ProductType)

    const allProducts = await productTypesRepository.find({
            relations: ['units'],
            order: {name: 'ASC'}
        })

    res.json({
        products: allProducts
    })

})

export {ListProducts}