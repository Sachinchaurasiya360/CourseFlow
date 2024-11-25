const { Admin } = require('../Database/index'); 


function adminMiddleware(req,res,next){
    const username=req.headers.username
   const  password=req.headers.password

    Admin.findOne({
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
 
module.exports=adminMiddleware;