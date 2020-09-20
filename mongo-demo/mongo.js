const { string, date } = require('joi')
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost/firstdb')
    .then(()=> console.log('Connected to the mongo db'))
    .catch(err=> console.error('error connecting db',err))


    const schema =new  mongoose.Schema({
        name:String,
        author:String,
        date:{type:Date,default:Date.now},
        tags:[String],
        isPublished:Boolean
    })    
const Course = mongoose.model('course',schema)
async function createCourse(){
  
    
    // creatng amodel calss
    // variable named in pascal conventino as mongoose.model returns a class
    
    // creatnig an object for the above created class
    
    const course = new Course({
        name:"Ember js",
        author:"Ajay",
        tags:["Ember-js","Frontend"]
    });
    const result =await course.save()
    console.log(result)
    
}

async function getCourse(){
    let allCourses= await Course.find({author:"Ajay"}).sort({name:1});
    console.log(allCourses)

}

// createCourse();
getCourse();