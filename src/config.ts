import getenv from 'getenv'
import {resolve} from 'path'

function getenv_path(key: string, fallback: string): string {
    let value = getenv.string(key, fallback)
    let separated: string[] = []
    value.split('/').map(part => part.split('\\').forEach((part) => separated.push(part)))
    return resolve(...separated)
}

// by default the container exposes only port 3000
export const httpPort = getenv.int("HTTP_PORT", 3000) 

export const dataFolder = getenv.string("DATA_FOLDER", "data")

export const knex = (() => {
    const client = getenv.string('KNEX_CLIENT', 'sqlite3')
    const connection = ((client: string) => {
        if (client === 'sqlite3') {
            return {
                filename: getenv_path('KNEX_SQLITE_FILENAME', `${dataFolder}/database.db`)
            }
        }
        throw new Error(`undefined database backend config: ${client}`)
    })(client)
    return {
        client,
        connection,
        useNullAsDefault: true // removes the warning
    }
})()

export default {
    httpPort,
    dataFolder,
    knex
}