import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import {ListUnits} from './apiv1/ListUnits'
import {ListProducts} from './apiv1/ListProducts'

const router = express.Router()

router.get('/units', ListUnits)

router.get('/products', ListProducts)


export {router}
