require('dotenv').config({path:'./server/.env'})
const express = require('express')
const app = express()

app.listen(3000,()=>console.log('server start',process.env.MY_VARIABLE))

console.log('server start',process.env.MY_VARIABLE)