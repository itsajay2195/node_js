console.log('setp 1')

getUser(1,(user)=>{
    console.log("user",user.name)
    getRepo(user.name,(repos)=>{
        console.log(repos)
    })
})
console.log('setp 2')


function getUser(id,callback){
    setTimeout(()=>{
       console.log('inside the async fn and the id is',id)
       callback({id:1,"name":"Brindha"})


    }),2000
}


function getRepo(username,callback){
    setTimeout(()=>{
        console.log("inside the get repo fn",username)
        callback(['repo1','repo2'])
           
    }),2000
}
