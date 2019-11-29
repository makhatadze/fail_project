const express = require('express')
require('./db/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8081

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(userRouter)
app.use(taskRouter)


app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}! sdakasd asdaklsd asdk`
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})