const button = new LogoutButton;
button.action = logout(()=> {
    if(?????){
      location.reload();
    }
}) 

const connector = new ApiConnector; 
connector.current(()=> {
    if(???){
         location.reload();
    }
})

const rates = new RatesBoard;
connector.getStocks(() => {
    if(???){
        rates.clearTable()
        rates.fillTable(data)
    }
})

connector.getStocks() //Вызовите данную функцию для получения текущих валют.
//Напишите интервал, который будет многократно выполняться (раз в минуту) и вызывать вашу функцию с получением валют.

const maneger = new MoneyManager;
maneger.addMoneyCallback = ({ currency, amount }, callback) => {
    connector.addMoney({ currency, amount }, callback)
}