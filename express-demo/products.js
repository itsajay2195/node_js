const express=require('express')
const app = express();

app.use(express.json()) 
const products=[{id:1,name:"Ajay"},{id:2,name:"Vijay"},{id:3,name:"Sajay"}]
app.get('/products',(req,res)=>{
    
    console.log('hi da punda')
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
    const product={
        id:products.length+1,
        name:req.body.name
    }
    
    products.push(product)
    res.send(product)
})

app.listen(3000,()=>console.log("hi da asss"))