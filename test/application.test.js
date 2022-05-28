import {describe, it} from '@jest/globals'
import {testUtils} from './test-utils.js'
import {server} from '../src/index.js'

const {makeRequest} = testUtils(server)
const {makeRequestSendingBody} = makeRequest('/user')

describe('', () => {
    it.only('should test global app middlewares', async () => {
        const {data} = await makeRequestSendingBody('get')
        console.log(data)
    })
})
