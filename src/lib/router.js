export const Router = () => {
    const routerMiddlewares = {
        global: [],
        routes: []
    }

    const use = (middleware) => {
        if(typeof middleware !== 'function')
            throw new Error('middleware is not a function')
            routerMiddlewares.global.push(middleware)
    }
    const addRoute = (routeMethod, routeUrl, middlewares) => {
        const router = { 
            routeMethod, 
            routeUrl, 
            middlewares
        }
        routerMiddlewares.routes.push(router)
    };
    const makeRoutes = () => {
        const get = async (routeUrl, ...middlewares) => addRoute('get', routeUrl, middlewares);
        const post = async (routeUrl, ...middlewares) => addRoute('post', routeUrl, middlewares);
        const put = async (routeUrl, ...middlewares) => addRoute('put', routeUrl, middlewares);
        const remove = async (routeUrl, ...middlewares) => addRoute('delete', routeUrl, middlewares);
        return {get, post, put, remove}
    }
    const route = (routeUrl) => {
        const routes = {
            post: (...middlewares) => makeRoute('post', middlewares),
            get: (...middlewares) => makeRoute('get', middlewares),
            put: (...middlewares) => makeRoute('put', middlewares),
            remove: (...middlewares) => makeRoute('delete', middlewares),
        }
        const makeRoute = (method, middlewares) =>  {
            addRoute(method, routeUrl, middlewares)
            return routes
        }
        return {...routes}
    }
    const list = routerMiddlewares
    return Object.freeze({...makeRoutes(), use, route, list})
}