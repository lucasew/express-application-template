import Router from 'express-promise-router'
import {celebrate, Joi} from 'celebrate'
import db from '../../../database'
import { throwApiError } from '../../../utils'

let router = Router()

const validateBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(1),
        age: Joi.number().integer().required(),
    })
})

const validadeParams = celebrate({
    params: Joi.object().keys({
        id: Joi.number().integer().positive()
    })
})

router.get('/', async function(request, response) {
    response.json({
        data: await db('test').select('*')
    })
})

router.get('/:id',
validadeParams,
async function(request, response) {
    const {id} = request.params
    let result = await db('test').where('id', '=', id).select('*')
    if (result.length === 0) {
        throwApiError(404, 'item not found')
    }
    response.json({
        data: result[0]
    })
})

router.post('/', 
validateBody,
async function (request, response) {
    response.json({
        data: (await db('test').insert(request.body))[0]
    })
})

router.delete('/:id',
validadeParams,
async function(request, response) {
    const {id} = request.params
    response.json({
        data: await db('test')
            .where('id', '=', id)
            .del()
    })
})

router.put('/:id',
validadeParams,
validateBody,
async function (request, response) {
    const {id} = request.params
    const {name, age} = request.body
    response.json({
        data: await db('test')
            .where({id})
            .update({name, age})
    })
})

export default router