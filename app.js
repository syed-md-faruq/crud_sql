const express = require('express')
const bodyparser = require('body-parser')
const app = express()

const router = require('./routes/crud_routes');

app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)
app.use('/', router);

app.get('/getapi',(req,res)=>{
    res.send("wokshkdfjshdkjf")
})
app.listen(5000, () => {
    console.log(`App is running...`)
  })