export const dealWithResponse = (res) => {
    const makeResponse = {
        status: (code) => {
            res.statusCode = code
            const {send} = makeResponse
            return {send}
        },
        send: (content) => {
            res.setHeader('Content-Type', 'text/plain')
            res.end(JSON.stringify(content))
        },
        sendStatus: (code, message) => {
            res.statusCode = code
            res.statusMessage  = message
            res.end('Route not found')
        }
    }
    
    return {...makeResponse}
}