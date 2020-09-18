const express=require('express')
const router = express.Router();



const products=[{id:1,name:"Ajay"},{id:2,name:"Vijay"},{id:3,name:"Sajay"}]
router.get('/',(req,res)=>{
    res.send(products)

 })

router.get('/:id',(req,res)=>{
    const product = products.find(c=>c.id === parseInt(req.params.id))
    if(!product){
        res.send("invalid id ")
        return;
    }

    res.send(product)
})

router.post("/",(req,res)=>{
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

router.put("/:id",(req,res)=>{
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

router.delete("/:id",(req,res)=>{
    let product = products.find(c=>c.id ===parseInt(req.params.id))
    if (!product){
        res.status(404).send("Inavlid id")
    }

    const index = products.indexOf(product)
    console.log("the index is",index)
    products.splice(index)
    res.send(product)
})


const Validation = (name) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(name, schema)
}

module.exports=router;