require('dotenv').config({ path: './server/.env' })
const express = require('express')
const app = express()
const { auth_router, companyRoute } = require('./routes/authRoute')
app.use(express.json())

app.use('/auth', auth_router)
app.use('/admin', companyRoute)
app.listen(3000, () => console.log('server start'))

