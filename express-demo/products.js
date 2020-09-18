const Joi = require('joi');
const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const middle = require('./logger')
const debug = require('debug')("app:start")
const end = require('debug')("app:end")
const express = require('express')
const app = express();
const products=require('./routes/productsRoute')
const home=require('./routes/homeRoute')




app.use(express.json())
app.use(middle); // this is a custom middleware
// app.use(express.static('')) //  this is generaly used when have to return a css or htm based on the endpoint hit, this is used in the v1 hf app
app.use(helmet())
// app.use(morgan('tiny')) // this is a logger, logs all the request made to the server, metnion the pattern of logger as an argument like ('tiny)/('large') ....

// enviroment based setup

console.log('process:', process.env.NODE_ENV)
console.log('app', app.get('env')) // this will retun 'devlopment' if the environment variable is not set

//configuration
console.log('app name ', config.get('name'))
console.log('host name ', config.get('mail.host'))
console.log('the password is ', config.get('mail.password'))
debug('the password is ', config.get('mail.password'))
end('only the end')
if (app.get('env') == 'testing') {
    app.use(morgan('tiny'))
    console.log("morgan enabled")
}

app.use('/products',products);
app.use('/home',home);
app.listen(3000, () => console.log("Listening on port 3000"))

