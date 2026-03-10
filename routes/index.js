const router=require('express').Router();

router.get('/',(req,res)=>{
    res.send("Hello world and people")
})

router.use('/contacts',require('./contacts'))
module.exports=router