import express from 'express'
import { Router } from 'express'

const app = express()
const router = Router()

router.get('/', async(req, res)=>{
    res.status(200).json({
        message : 'hi'
    })
})

app.use('/api', router)

const port = process.env.PORT || 3232

app.listen(port, ()=>{
    console.log(`server listening on http://localhost:${port}`)
})