const mongoose= require('mongoose')


mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected to the mongo db'))
    .catch(err=> console.error('error connecting db',err))


const schema = mongoose.Schema({
    
    date:Date,
    name:String,
    author:String,
    isPublished:Boolean,
    price:Number,
})    


const Course =  mongoose.model('course',schema);

async function getData(){
    return await Course.find({isPublished:true,tags:{$in:['frontend','backend']}})
    .or([{price:{$gte:15}},
    {name:/.*by.*/i}
])
    .sort({price:-1})
    .select({name:1,author:1,price:1});
}

async function run(){
const courses = await getData();
console.log(courses)
}

run();