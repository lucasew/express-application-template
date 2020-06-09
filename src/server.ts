import express, {ErrorRequestHandler} from 'express'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'
import routes from './routes'
import { throwApiError } from './utils'

export interface ServerResponse<T> {
    data: T
    error: string
}

let app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(routes)

app.use((request, response) => {
    throwApiError(404, 'route not found')
})

const errorHandler: ErrorRequestHandler = function(err, request, response, next) {
    let {status, message, stack, joi} = err
    if (joi) { // if celebrate throws a error, its a validation error, so bad request (400)
        status = 400
    }
    if (stack) {
        console.log(stack)
    }
    response.status(status || 500).json({
        error: message
    })
}
app.use(errorHandler)

app.listen(config.httpPort,
    () => {
        console.log(`Running server at port ${config.httpPort}.`)
        console.log("Make sure you are exporting the port properly ;)")
    }
)