const MD5 = require('crypto-js/md5');
const SHA1 = require('crypto-js/sha1');
const SHA256 = require('crypto-js/sha256');
const HmacSHA1 = require('crypto-js/hmac-sha1');
const HmacSHA256 = require('crypto-js/hmac-sha256');
const path = require('path');

const CryptoJS = require('crypto-js');

module.exports={
    encriptText:function(messageUser,keyUser){
        let message = messageUser;
        let key = keyUser;
        let result = CryptoJS.AES.encrypt(message, key);      
        return result
    }
    ,
    descriptText:function(hashUser,keyUser){
      
        let result2=CryptoJS.AES.decrypt(hashUser, keyUser).toString(CryptoJS.enc.Utf8)
        return result2
    
    }
    ,
    encriptFile:function(userFile,mode){
        function encryp(data, key){
            return CryptoJS.AES.encrypt(data, key).toString();
        }
        
        function decryp(data, key){
            var wA= CryptoJS.AES.decrypt(data, key);
            return wA.toString(CryptoJS.enc.Utf8);
        }             
        var file_inp=  userFile;
        var op=  mode;
        var pass= 'clave';
        var deep= 3;
        var file_out= 'texto.txt.cfr';
        
        
        var fs = require('fs');
        var binary = fs.readFileSync(file_inp);
        
        var buffer=null;
        
        if(op=='enc'){    
            let base64data = binary.toString('base64');
            let enc=base64data;
            for (let i = 1; i <= deep; i++) {
                enc= encryp(enc, pass);     
            }
            
            buffer = Buffer.from(enc, "utf-8");

            
        }else if(op=='des'){
            let dataS= binary.toString("ascii");
            let dec=dataS;
            for (let i = 1; i <= deep; i++) {
                dec= decryp(dec, pass); 
            }
            buffer = Buffer.from(dec, 'base64');
        }
        
        fs.open(file_out, 'w', function(err, fd) {
            if (err) {
                throw 'No se puede crear el archivo: ' + err;
            }
            
            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                if (err) throw 'Error al escribir en el archivo: ' + err;
                fs.close(fd, function() {});
            });
        });
        
        
    },
    encriptTextSha:function(messageUser,keyUser){
        let message = messageUser;
        let key = keyUser;
        // Uso 2: Todo el uso, debido a que aes contiene cifrado y descifrado, hay dos m??todos, no puede usar AES directamente para cifrar
        let result = CryptoJS.DES.encrypt(message, key);; 
        return result
    },
    descriptTextSha:function(hashResu,key){
        let result2= CryptoJS.DES.decrypt(hashResu, key).toString(CryptoJS.enc.Utf8);
        return result2
    },
    decripFile:function(fileUser,mode){
        var file_inp=  fileUser;
        var op=  mode;
        var pass= 'clave';
        var deep= 3;
        var file_out= 'texto.txt.cfr';
        var wA= CryptoJS.DES.decrypt(data, key);
        wA.toString(CryptoJS.enc.Utf8);
        let dataS= binary.toString("ascii");
            let dec=dataS;
            for (let i = 1; i <= deep; i++) {
                dec= decryp(dec, pass); 
            }
            buffer = Buffer.from(dec, 'base64');
    }
}


