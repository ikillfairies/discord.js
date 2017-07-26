const request = require('request');
const secrets = require('../secrets');
const coinbaseURL = 'https://api.coinbase.com/v2/prices/';

const symbolPattern = /[a-z]{1,5}/gi;
const conditionPattern = /[<>=]{1,2}/;
const pricePattern = /[0-9]{1,7}/;

module.exports = (

  function(notification, commands, notificationChannel, notificationText) {

    symbolPattern.lastIndex = 0;
    conditionPattern.lastIndex = 0;
    pricePattern.lastIndex = 0;

    if ((match = conditionPattern.exec(notificationText)) == null) {
      clearInterval(notification);
      return channel.send('Your condition must be >, <, >=, or <= (example usage: `send notification when LTC < 50`).');
    }

    var symbol = notificationText.substring(0, notificationText.lastIndexOf(match[0])).replace(' ', '').toUpperCase();
    var price = notificationText.substring(notificationText.indexOf(match[0]) + 1).replace(' ', '');
    var condition = match[0];

    if (symbolPattern.exec(symbol) == null || pricePattern.exec(price) == null) {
      clearInterval(notification);
      return channel.send('Invalid symbol or price.');
    }

    var buyPrice;

    var buyPromise = new Promise(function(resolve, reject) {
      var buyURL = coinbaseURL + symbol + '-USD/buy';
      request(buyURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var response = JSON.parse(body);
          buyPrice = response.data.amount;
          resolve('Success');    
        }
        else {
          clearInterval(notification);
          reject('Failed to look up ' + symbol + ' buy price.');
        }
      });
    });

    Promise.all([buyPromise]).then(function(result) {
      console.log('Current ' + symbol + ' price is: ' + buyPrice); 
      if (buyPrice < price) {
        channel.send(symbol + ' is below ' + String(price));
        commands.getCryptoPrice(channel, symbol);
        console.log('Stopping notifications');
        clearInterval(notification);
      }
    }, function(err) {
      channel.send(err);
    });

  }
)

