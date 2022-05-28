// @ts-nocheck
import { urlHelper } from "./url-helper.js"
import eventEmitter from 'events'

export const requestHelper = (req) => {
    const {getParams} = urlHelper()

    const getBodyData = async () => {
        const data = await eventEmitter.once(req, 'data')
        if(!data) 
            throw new Error('fail to parse body data')
        return JSON.parse(data)
    }

    
    const getData = () => {
        const body = getBodyData()
        const params = getParams(req.url)
        const headers = req.headers
        return {body, params, headers}
    }

    return {getData}
}