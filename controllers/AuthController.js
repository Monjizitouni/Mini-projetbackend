const Use   = require('../models/use')
const bcrypt  =require('bcryptjs')
const jwt    =require('jsonwebtoken')
const { use } = require('../routes/users')

const register =(req, res, next)=> {
    console.log(
        req.body.username
)
console.log(
    req.body.email
)
console.log(
    req.body.phone
)
console.log(
    req.body.password
)
console.log(
    req.body.avatar
)


Use.findOne({email: req.body.email}, function(err, use){
    if(err) {
      console.log(err);
    }
    var message;
    if(use) {
      console.log(use),
      console.log('user exists')
      return res.json({
        message : 'user exists'
      })
        

    } else {
        bcrypt.hash(req.body.password,10, function(err,hashedPass){
            if(err){
                console.log('user erreur1')
                console.log(err)
               return res.json({
                    
                    error: err
    
                })
            }
            let use = new Use({
                username: req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password: hashedPass,
                avatar : req.body.avatar
        
        
            })
           
        
            use.save()
            .then(use =>{
                console.log('user added')
                 return res.json({
                    username :use.username,
                    email :use.email,
                    phone :use.phone,
                    password :hashedPass,
                    avatar : use.avatar
                })
            })
            .catch(error =>{
                console.log('user erreur2')
                 return res.json({
                    message:'error with user adding'
                })
            })
    
        })
    }
    
});


  

}
const login = (req, res ) => {
    var usename = req.body.usename 
    var password =req.body.password
    Use.findOne({email: usename}, function(err, use){
        if(err) {
          console.log(err);
        }
       
        if(use) {
            bcrypt.compare(password, use.password, function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: use.name},'verysecretValue',{expiresIn: '1h'})
              console.log(result)
                    return res.json({
                
                         username :use.username,
                        email :use.email,
                        phone :use.phone,
                       password : use.password,
                       avatar : use.avatar,
                       token
                      
                       

                    })
                
                }else{
                    res.json({
                        message:'password does not matched !'
                    })
                }
            })

    
             } else {
            return res.json({
                message : 'usere leee'
            })
     
            
        
        }
    })

}






module.exports ={
register, login
}
