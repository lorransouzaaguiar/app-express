import aplication from "./lib/index.js"

const app = aplication.App()
const router = aplication.Router()
const router1 = aplication.Router()

app.use(() => {
    console.log('ola mundo app global')
})
router.use(() => {
    console.log('user global')
})
router.get('/', (req, res) => {
    console.log('ola user')
    res.status(200).send('ola mundo')
})
router.remove('/:id', (req, res) => {
    console.log('ola user')
    res.status(200).send('ola mundo')
})
router1.get('/', (req, res) => {
    console.log('ola product')
    res.status(200).send('ola product')
})
app.use('/user', router)
app.use('/product', router1)

export {app}
