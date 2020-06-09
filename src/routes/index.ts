import Router from 'express-promise-router'
import {loadRoutesInFolders} from '../utils'

// router.use('/api', require('./api').default)

export default loadRoutesInFolders(__dirname)