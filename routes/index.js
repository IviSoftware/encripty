var express = require('express');
var router = express.Router();
var encripty = require('../config/encript');
const path = require("path");
const fs = require("fs");
const https = require('https');
const { Console } = require('console');
let newName=0;
let newNameEncript=0

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Encripty' });
});

router.get('/encriptarOne',function(req,res){
  const {encriptext,descencriptext,upload,encripty,uploaddesc,descript}= req.query;
  console.log(encripty)
  if(encriptext){
    res.render('encriptarOne.ejs',{textEncript:encriptext})
  }else if(descencriptext){
    res.render('encriptarOne.ejs',{textDescript:descencriptext})
  }else if(upload && !encripty){
    res.render('encriptarOne.ejs',{uploadOk:upload})
  }else if(upload && encripty){
    res.render('encriptarOne.ejs',{uploadOk:upload,encriptyOK:encripty})
  }else if(uploaddesc && !descript){
    res.render('encriptarOne.ejs',{uploadDescOk:uploaddesc})
  }else if(uploaddesc && descript){
    res.render('encriptarOne.ejs',{uploadDescOk:uploaddesc,encriptyDescOK:descript})
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

  await encripty.encriptFile(newName,'enc')
  res.redirect(`/encriptarOne?upload=ok&encripty=ok`)

})

router.get('/encriptarOne/dowload',function(req,res){
  try {
    // Image will be stored at this path
  const file = path.join(__dirname, '..','texto.txt.cfr'); 
  //var file = __dirname + '/upload-folder/dramaticpenguin.MOV'; 
  res.download(file,'texto.txt.cfr',(err)=>{
    if(err){
      console.log("error",err)
    }else{
      console.log('listo')
    }
  }); 
  fs.unlinkSync(newName)
  
  } catch (error) {
    console.log(error)
  }
  
})

//Desencriptar
router.post("/encriptarOne/descupload", (req, res) => {
  let oldName = req.files[0].path;
  newNameEncript = req.files[0].path + path.parse(req.files[0].originalname).ext;  
 
 fs.renameSync(oldName, newNameEncript);// Cambiar el nombre de la imagen
  res.redirect(`/encriptarOne?uploaddesc=ok`)
  
});

router.post('/encriptarOne/descencriptFileAES',async function(req,res){

  await encripty.encriptFile(newNameEncript,'des')
  res.redirect(`/encriptarOne?uploaddesc=ok&descript=ok`)

})

router.get('/encriptarOne/desDowload',function(req,res){
  try {
    // Image will be stored at this path
  const file = path.join(__dirname, '..','texto.txt.cfr'); 
  //var file = __dirname + '/upload-folder/dramaticpenguin.MOV'; 
  res.download(file,'texto.txt.cfr',(err)=>{
    if(err){
      console.log("error",err)
    }else{
      console.log('listo')
    }
  }); 
  fs.unlinkSync(newNameEncript)
  
  } catch (error) {
    console.log(error)
  }
  
})


//Acaban rutas para archivos AES


//RUTAS PARA SHA

router.get('/encriptarTwo',function(req,res){
  const {encriptext2,descencriptext2,upload2,encripty2,uploaddesc2,descript2}= req.query;
  if(encriptext2){
    res.render('encriptarTwo.ejs',{textEncript:encriptext2})
  }else if(descencriptext2){
    res.render('encriptarTwo.ejs',{textDescript:descencriptext2})
  }else if(upload2 && !encripty2){
    res.render('encriptarTwo.ejs',{uploadOk:upload2})
  }else if(upload2 && encripty2){
    res.render('encriptarTwo.ejs',{uploadOk:upload2,encriptyOK:encripty2})
  }else if(uploaddesc2 && !descript2){
    res.render('encriptarTwo.ejs',{uploadDescOk:uploaddesc2})
  }else if(uploaddesc2 && descript2){
    res.render('encriptarTwo.ejs',{uploadDescOk:uploaddesc2,encriptyDescOK:descript2})
  }
  else{
    res.render('encriptarTwo.ejs')
  }
})

router.post('/encriptarTwo/encriptSHA',function(req,res){
  let result = encripty.encriptTextSha(req.body.userText,req.body.userPassword);
  var string = encodeURIComponent(result);
  res.redirect('/encriptarTwo?encriptext2='+string)
})

router.post('/encriptarTwo/descencriptSHA',function(req,res){
  let result2 = encripty.descriptTextSha(req.body.userDescText,req.body.userDescPassword);
  var string2 = encodeURIComponent(result2);
  res.redirect('/encriptarTwo?descencriptext2='+string2)
})


module.exports = router;
