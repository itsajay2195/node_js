const Joi=require('joi');
const config=require('config')
const morgan = require('morgan')
const helmet = require ('helmet')
const middle=require('./logger')
const express=require('express')
const app = express();



app.use(express.json())
app.use(middle) ; // this is a custom middleware
// app.use(express.static('')) //  this is generaly used when have to return a css or htm based on the endpoint hit, this is used in the v1 hf app
app.use(helmet())
// app.use(morgan('tiny')) // this is a logger, logs all the request made to the server, metnion the pattern of logger as an argument like ('tiny)/('large') ....

// enviroment based setup

console.log('process:', process.env.NODE_ENV)
console.log('app',app.get('env')) // this will retun 'devlopment' if the environment variable is not set

//configuration
console.log('app name ',config.get('name'))
console.log('host name ',config.get('mail.host'))
console.log('the password is ',config.get('mail.password'))
if(app.get('env')== 'testing'){
    app.use(morgan('tiny'))
    console.log("morgan enabled")
}






const products=[{id:1,name:"Ajay"},{id:2,name:"Vijay"},{id:3,name:"Sajay"}]
app.get('/products',(req,res)=>{
    res.send(products)

 })

app.get('/products/:id',(req,res)=>{
    const product = products.find(c=>c.id === parseInt(req.params.id))
    if(!product){
        res.send("invalid id ")
        return;
    }

    res.send(product)
})

app.post("/products",(req,res)=>{
    const {error}= Validation(req.body)
    if(error){
        res.status(400).send("the name must have ateleast 3 characters")
        return;
    }
    const product={
        id:products.length+1,
        name:req.body.name
    }
    
    products.push(product)
    res.send(product)
})

app.put("/products/:id",(req,res)=>{
    let product = products.find(c=>c.id ===parseInt(req.params.id))
    if (!product){
        res.status(404).send("Inavlid id")
    }

    const {error}= Validation(req.body)
    if(error){
        res.status(400).send("The must have atlease 3 characters")
    }

    product.name= req.body.name
    
    res.status(200).send(product)
    
})

app.delete("/products/:id",(req,res)=>{
    let product = products.find(c=>c.id ===parseInt(req.params.id))
    if (!product){
        res.status(404).send("Inavlid id")
    }

    const index = products.indexOf(product)
    console.log("the index is",index)
    products.splice(index)
    res.send(product)
})

app.listen(3000,()=>console.log("Listening on port 3000"))

const Validation = (name)=>{
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(name,schema)
}