const {user}=require('../Database/index')

function usermiddleware(req,res,next){
    username=req.headers.username
    password=req.headers.password

    user.findOne({
        username:username,
        password:password
    }).then((data)=>{   
        if(data){
            next()
        }
        else{
            res.send('You are not authorized to access this route')
        }
    })
}
 
module.exports=usermiddleware;