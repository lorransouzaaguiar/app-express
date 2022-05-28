import supertest from 'supertest'

export const testUtils = (server) => {
    const shouldTest = (urlPathname) => {
        const itShouldTestInvalidProperty = async (requestMethod, objectMock, property, msgError) => {
            const {makeRequestSendingBody} = makeRequest(urlPathname)
            const {data} = await makeRequestSendingBody(requestMethod, objectMock)
            /* console.log(data) */
            expect(data.statusCode).toBe(400)
            expect(data.body[property]).toBe(msgError)
        }
    
        return Object.freeze({itShouldTestInvalidProperty})
    }

    const makeRequest = (urlPathname) => {
        const makeRequestSendingBody = async (method, sendData) => {
            const response = await supertest.agent(server)[method](urlPathname).send(sendData)
            const data = JSON.parse(response.text)  /* response.text */
            return {data}
        }
        
        const makeRequestSendingParams = async (method, sendData) => {
            const response = await supertest.agent(server)[method](urlPathname).query(sendData)
            const data =  JSON.parse(response.text)   /*  response.text */
            return {data}
        }
        const makeRequestSendingBodyAndParams = async (method, sendBodyData, sendParamData) => {
            const response = await supertest.agent(server)[method](urlPathname).query(sendParamData).send(sendBodyData)
            const data =  JSON.parse(response.text)   /*  response.text */
            return {data}
        }
        
        const makeMultiRequest = async (initial, final, request) => {
            for(let i = initial; i <= final; i++) {
                await request(i)
            }
        }
    
        return Object.freeze({
            makeRequestSendingBody, 
            makeRequestSendingParams, 
            makeMultiRequest,
            makeRequestSendingBodyAndParams
        })
    
    }

    return Object.freeze({shouldTest, makeRequest})
}

