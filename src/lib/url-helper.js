import Url from 'url'

 export const urlHelper = () => {
    const getParameterAttributes = (url) => Object.keys(getParams(url))
    const getPathname = (url) => Url.parse(url, true).pathname
    const getParams = (url) => Url.parse(url, true).query

    return {getPathname, getParams, getParameterAttributes}
}