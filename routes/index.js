const router=require('express').Router();

router.get('/',(req,res)=>{
    //#swagger.tags=['Hello word and people']
    res.send("Hello world and people")
})

router.use('/contacts',require('./contacts'))
module.exports=router