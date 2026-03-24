const router = require('express').Router();

// Root endpoint
router.get('/', (req, res) => {
    //#swagger.tags = ['Root']
    res.send("Hello world and people");
});

module.exports = router;
