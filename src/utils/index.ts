import {lstatSync, readdirSync, existsSync} from 'fs'
import {join} from 'path'
import Router from 'express-promise-router'

export function throwApiError(status: number, message: string) {
    throw {status, message}
}

export const isDirectory = (path: string) => lstatSync(path).isDirectory()

export function loadModulesInFolders<T>(path: string, validator: (data: T) => boolean) {
    if (existsSync(path) && isDirectory(path)) {
        return readdirSync(path)
            .filter((child) => isDirectory(join(path, child))) // filter only directories
            .map((child) => {
                return { // return {name, module} for each directory
                    name: child,
                    module: require(join(path, child)).default
                }
            })
            .filter((child) => validator(child.module)) // forward only validated modules
    }
    return [] // if the path is a file return empty
}

export function loadRoutesInFolders(path: string) {
    let routes = Router()
    loadModulesInFolders<any>(path, (r) => {
        const {stack, acl, get} = r
        if (stack === undefined) {
            return false
        }
        if (acl === undefined) {
            return false
        }
        if (get === undefined) {
            return false
        }
        return true
    }).map((route) => {
        // console.log(route.name)
        routes.use(`/${route.name}`, route.module)
    })
    return routes
}