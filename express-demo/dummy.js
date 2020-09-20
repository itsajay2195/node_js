console.log('setp 1')

getUser(1,(user)=>{
    console.log("user",user.name)
    getRepo(user.name,getRepos)
})
console.log('setp 2')


// function getUsername(user){
//     console.log(user.name)
//     getRepos(user.name)
// }

// function getRepos(repos){
//     console.log(repos);
// }

function getUser(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('inside the async fn and the id is',id)
            resolve({id:1,"name":"Brindha"})
            
     
         }),2000
    })
   
}


function getRepo(username,callback){
    setTimeout(()=>{
        console.log("inside the get repo fn",username)
        callback(['repo1','repo2'])
           
    }),2000
}
