var express = require('express');
var router = express.Router();
var encripty = require('../config/encript');
const path = require("path");
const fs = require("fs");
const https = require('https');
let newName=0;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Encripty' });
});

router.get('/encriptarOne',function(req,res){
  const {encriptext,descencriptext,upload,encripty}= req.query;
  console.log(encripty)
  if(encriptext){
    res.render('encriptarOne.ejs',{textEncript:encriptext})
  }else if(descencriptext){
    res.render('encriptarOne.ejs',{textDescript:descencriptext})
  }else if(upload && !encripty){
    res.render('encriptarOne.ejs',{uploadOk:upload})
  }else if(upload && encripty){
    res.render('encriptarOne.ejs',{uploadOk:upload,encriptyOK:encripty})
  }
  else{
    res.render('encriptarOne.ejs')
  }
})


//Ruta para encriptar y desencripotar texto modo AES
router.post('/encriptarOne/encriptAES',function(req,res){
  let result = encripty.encriptText(req.body.userText,req.body.userPassword);
  var string = encodeURIComponent(result);
  res.redirect('/encriptarOne?encriptext='+string)
})

router.post('/encriptarOne/descencriptAES',function(req,res){
  let result2 = encripty.descriptText(req.body.userDescText,req.body.userDescPassword);
  var string2 = encodeURIComponent(result2);
  res.redirect('/encriptarOne?descencriptext='+string2)
})

//Acaban rutas de texto

//Rutas para archivos en AES

router.post("/encriptarOne/upload", (req, res) => {
  let oldName = req.files[0].path;
  newName = req.files[0].path + path.parse(req.files[0].originalname).ext;  
  
 
 fs.renameSync(oldName, newName);// Cambiar el nombre de la imagen
  let statusUpload = {
    err: 0,
    url:
      "http://localhost:3000/upload/" +
      req.files[0].filename +
      path.parse(req.files[0].originalname).ext,// La ruta de vista previa de la imagen
    name: req.files[0].filename + path.parse(req.files[0].originalname).ext
  }

  res.redirect(`/encriptarOne?upload=ok`)
  
});


router.post('/encriptarOne/encriptFileAES',async function(req,res){

  await encripty.encriptFile(newName)
  res.redirect(`/encriptarOne?upload=ok&encripty=ok`)

})

router.get('/encriptarOne/dowload',function(req,res){
  // Image will be stored at this path
  const file = path.join(__dirname, '..','texto.txt.cfr'); 
  //var file = __dirname + '/upload-folder/dramaticpenguin.MOV'; 
  res.download(file,'texto.txt.cfr',(err)=>{
    if(err){
      console.log("error",err)
    }else{
      console.log('listo')
    }
  }); // Set disposition and send it.
})

//Acaban rutas para archivos AES

module.exports = router;
