"use strict";
const userNew = new UserForm;
userNew.loginFormCallback = (data, callback) => {
    ApiConnector.login(data, callback){ 
    if( ???????){
      return location.reload()
    } else{
       return setLoginErrorMessage(message)
    }
   }
}

userNew.registerFormCallback = (data, callback) => {
    ApiConnector.register(data, callback)
    if(??????){
     ?????????
    }else{
        setRegisterErrorMessage(message)
    }
}

