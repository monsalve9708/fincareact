import * as servicios from '../constants/servicios';
import key  from '../constants/key';
const CryptoJS = require("crypto-js")

const LoginService = async (login) => {
    login.password =CryptoJS.AES.encrypt(login.password,key).toString();
    return await fetch(servicios.SERVER+servicios.PORT+servicios.URLLOGIN,{
       method: "POST",
       headers:
           {"Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods":"GET,POST,PUT,PATCH,DELETE",
               "Content-Type":"application/json"
           },
       body: JSON.stringify(login)

   });
}
export default LoginService;