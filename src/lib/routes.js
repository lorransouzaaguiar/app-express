import { urlHelper } from './url-helper.js'

export const dealWithRoutes = (routes) => {
    const findRoute = (requisitionMethod, requisitionUrl) => {
       return routes.find(({routeMethod, routeUrl}) => {
            const {matching} = checkMatchingRoutes(requisitionUrl, routeUrl)
            return routeMethod === requisitionMethod && matching
        })
    }
    
    const checkMatchingRoutes = (requisitionUrl, routeUrl) => {
        const {getPathname, getParameterAttributes} = urlHelper()
        const urlPathname = getPathname(requisitionUrl)
        const urlParameters = getParameterAttributes(requisitionUrl)
        const routePathNameAndParameters = routeUrl.replaceAll('/:', ' ').split(' ')
        const [routePathname] = routePathNameAndParameters
        const routeParameters = routePathNameAndParameters.slice(1)
        const isEqual = (element1, element2) => element1 === element2
        
        if(!isEqual(urlParameters, routeParameters) && !isEqual(urlPathname, routePathname)) 
            return {matching: false} 
           
        return {matching: true}
    }  

    return {findRoute}
}