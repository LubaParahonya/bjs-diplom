"use strict"
const newLogoutButton = new LogoutButton();
const newRatesBoard = new RatesBoard();
const newMoneyManager = new MoneyManager();
const newFavoritesWidget = new FavoritesWidget();


newLogoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response.success){
            location.reload();
        } 
    })
} 

ApiConnector.current(response => {
    if(response.success){
        ProfileWidget.showProfile(response.data)
    }
})
setInterval(function getCurrencyRate (){
    ApiConnector.getStocks(response => {
        if(response.success){
            newRatesBoard.clearTable()
            newRatesBoard.fillTable(response.data)
        }
    })
}, 1000)

//ApiConnector.getStocks(courseRequest)()
//setInterval(ApiConnector.getStocks(courseRequest), 60000)

newMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data)
            newMoneyManager.setMessage(response.success, "Баланс пополнен!")
        } else{
            newMoneyManager.setMessage(response.success, response.error)
        }
    })
}


newMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(response.success, "Средства конвертированы!");
        } else{
            newMoneyManager.setMessage(response.success, response.error)
        }
    
    })
}

newMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            newMoneyManager.setMessage(response.success, "Средства переведены!");
        } else{
            newMoneyManager.setMessage(response.success, response.error);
        }
    })
}

ApiConnector.getFavorites(response => {
    if(response.success){
        newRatesBoard.clearTable();
        newFavoritesWidget.fillTable(response.data)
        newMoneyManager.updateUsersList(response.data)

    }
})


newFavoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response =>
        {if(response.success){
            newRatesBoard.clearTable();
            newFavoritesWidget.fillTable(response.data)
            newMoneyManager.updateUsersList(response.data)
            newMoneyManager.setMessage(response.success, "Пользователь добавлен в список!")    
        } else{
        newMoneyManager.setMessage(response.success, response.error)
        }

        })
}

newFavoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>
        {if(response.success){
            newRatesBoard.clearTable();
            newFavoritesWidget.fillTable(response.data)
            newMoneyManager.updateUsersList(response.data)
            newMoneyManager.setMessage(response.success, "Пользователь удален из списка!")    
        } else{
        newMoneyManager.setMessage(response.success, response.error)
        }

        })
}