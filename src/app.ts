import express from 'express'
import config from 'config'
import logger from './utils/logger'
import connect from './utils/connect'
import routes from './routes'

const app = express()
const port = config.get<string>("port")
const host = config.get<number>("host")

app.use(express.json())

app.listen(port, async ()=>{
    logger.info(`server is listening on http://${host}:${port}`)

    await connect()

    routes(app)
})