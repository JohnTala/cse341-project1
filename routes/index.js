const router = require('express').Router();

// Root endpoint
router.get('/', (req, res) => {
    //#swagger.tags = ['Root']
    res.send("Hello world and people");
});

// Mount contacts router
router.use('/contacts', require('./contacts'));

module.exports = router;
