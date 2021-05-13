require('dotenv').config({ path: './server/.env' })
const express = require('express')
const app = express()
const auth_router = require('./routes/authRoute')
const companyRoute = require('./routes/companyRoute')
const stationRoute = require('./routes/stationRoute')
const tripRoute = require('./routes/tripRoute')
const stopOverRoute = require('./routes/stopOverRoute')
const bookingRoute = require('./routes/bookingRoute')
const authenticateToken = require('./controllers/authController').authenticateToken
app.use(express.json())

app.use('/auth', auth_router)
app.use('/admin', stationRoute)
app.use('/admin', companyRoute)
app.use('/admin', tripRoute)
app.use('/admin', stopOverRoute)
app.use(bookingRoute)



app.listen(3000, () => console.log('server start'))

