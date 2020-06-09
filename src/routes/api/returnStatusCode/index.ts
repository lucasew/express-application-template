import {throwApiError} from '../../../utils'
import {celebrate, Joi} from 'celebrate'
import Router from 'express-promise-router'

let routes = Router()

routes.get('/:statusCode/:message',
celebrate({
    params: Joi.object({
        statusCode: Joi.number().integer().positive(),
        message: Joi.string()
    })
}), 
function(request, response) {
    const {statusCode, message} = request.params
    throwApiError(Number(statusCode), message)
})

export default routes