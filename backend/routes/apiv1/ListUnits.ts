import * as asyncHandler from 'express-async-handler'
import {getRepository} from "typeorm"
import {Units} from '../../orm/entity/Units'

const ListUnits = asyncHandler(async (req, res, next) => {

    const unitsRepository = getRepository(Units)

    const allUnits = await unitsRepository.find({order: {id: 'ASC'}})

    res.json({
        units: allUnits,
    })

})

export {ListUnits}