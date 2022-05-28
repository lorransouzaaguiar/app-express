import {dealWithRoutes} from './routes.js' 
import {requestHelper} from './request-helper.js' 
import {createServer} from 'http'
import { dealWithResponse } from './response.js'
import { middlewareManager } from './middleware-manager.js'
import {Router} from './router.js'
import { urlHelper } from './url-helper.js'

export default (() => {
    const appMiddlewares = {
        global: [],
        routeGroups: []
    }
    
    const App = () => {
        const use = (...args) => {
            if(typeof args[0] === 'string' && typeof args[1] === 'object') {
                const pathname = args[0]
                const router = args[1].list
                const routeGroup = createGroupOfRoutes(pathname, router)
                appMiddlewares.routeGroups.push(routeGroup)
            }
            if(typeof args[0] === 'function') {
                const middleware = args[0]
                appMiddlewares.global.push(middleware)
            }
        }

        const createGroupOfRoutes = (pathname, router) => {
            const routeGroup = Object.freeze({
                pathname,
                global: router.global,
                routes: router.routes.map(route => 
                    ({...route, 
                        routeUrl: route.routeUrl === '/' ? 
                            pathname : `${pathname}${route.routeUrl}`
                    }))
            })
            return routeGroup
        }   

        const findRouteFromResquest = (req, res, routes) => {
            const {findRoute} = dealWithRoutes(routes)
            const method = req.method.toLowerCase();
            const urlRequest = req.url.toLowerCase();
            const route = findRoute(method, urlRequest);
            if(!route) {
                generateRouteError(res)
                return {exist: false}
            }

            return {exist: true, route}
        }

        const findRouteGroupFromRequest = (req, res, routeGroups) => {
            const {getPathname} = urlHelper()
            const pathname = getPathname(req.url)
            const routeGroup = routeGroups.find(routeGroup => 
                routeGroup.pathname === pathname)
            if(!routeGroup) {
                generateRouteError(res)
                return {exist: false}
            }
            return {exist: true, routeGroup}
        }

        const generateRouteError = (res) => {
            res.statusCode = 404
            res.end(JSON.stringify('Route not found'))
        }
    
        const listen = (port, cb) => createServer((req, res) => {
            middlewareManager(appMiddlewares.global)
            const {exist, routeGroup} = findRouteGroupFromRequest(req, res, appMiddlewares.routeGroups)
            if(exist) {
                middlewareManager(routeGroup.global)
                const {exist, route} = findRouteFromResquest(req, res, routeGroup.routes)
                if(exist) {
                    const request = requestHelper(req).getData()
                    const reponse = dealWithResponse(res)
                    middlewareManager(route.middlewares, {request, reponse}, 'next')
                }

            }

        }).listen(port, cb);
    
        return {use, listen};
      };
    
      return {App, Router};
})()