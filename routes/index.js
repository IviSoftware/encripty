var express = require('express');
var router = express.Router();
var encripty = require('../config/encript')


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Encripty' });
});

router.get('/encriptarOne',function(req,res){
/*   encripty.encriptFile() */
  res.render('encriptarOne.ejs')
})

router.post('/encriptarOne/encriptAES',function(req,res){
  let result = encripty.encriptText(req.body.userText,req.body.userPassword);
  res.render('encriptarOne.ejs',{textEncript:result})
})

router.post('/encriptarOne/descencriptAES',function(req,res){
  let result2 = encripty.descriptText(req.body.userDescText,req.body.userDescPassword);
  res.render('encriptarOne.ejs',{textDescript:result2})
})

module.exports = router;
