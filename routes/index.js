var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encripty' });
});

router.get('/encriptarOne',function(req,res){
  res.render('encriptarOne.ejs')
})

module.exports = router;
