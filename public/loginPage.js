"use strict"
const newUser = new UserForm();

newUser.loginFormCallback = data => ApiConnector.login(data, checkLoginFunc);

function checkLoginFunc(response) {
  if (response.success) {
    location.reload();
  } else {
    newUser.setLoginErrorMessage(response.error);
  }
}

newUser.registerFormCallback = data => ApiConnector.register(data, checkRegistryFunc);

function checkRegistryFunc(response) {
  if (response.success) {
    location.reload();
  } else {
    newUser.setRegisterErrorMessage(response.error);
  }
}