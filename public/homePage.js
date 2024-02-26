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
///Напишите функцию, которая будет выполнять запрос получения курсов валют.
function(){
    ApiConnector.getStocks(response => {
        if(response.success){
            newRatesBoard.clearTable()
            newRatesBoard.fillTable(response.data)
        }
    })
}

//ApiConnector.getStocks(courseRequest)()
//setInterval(ApiConnector.getStocks(courseRequest), 60000)

newMoneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(!response.success){
            newMoneyManager.setMessage(response.success, "Баланс не пополнен!")
        }
        ProfileWidget.showProfile(response.data)
        newMoneyManager.setMessage(response.success, "Баланс пополнен!")
    })
}


newMoneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(!response.success){
            newMoneyManager.setMessage(response.success, "Средства не конвертированы!")
        }
        ProfileWidget.showProfile(response.data)
        newMoneyManager.setMessage(response.success, "Средства конвертированы!")
    
    })
}

newMoneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(!response.success){
            newMoneyManager.setMessage(response.success, "Средства не переведены!")
        }
        ProfileWidget.showProfile(response.data)
        newMoneyManager.setMessage(response.success, "Средства переведены!")
    
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
        }
        newMoneyManager.setMessage(response.success, "Пользователь не добавлен в список!") 

        })
}

newFavoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response =>
        {if(response.success){
            newRatesBoard.clearTable();
            newFavoritesWidget.fillTable(response.data)
            newMoneyManager.updateUsersList(response.data)
            newMoneyManager.setMessage(response.success, "Пользователь удален из списка!")    
        }
        newMoneyManager.setMessage(response.success, "Пользователь не удален из список!") 

        })
}