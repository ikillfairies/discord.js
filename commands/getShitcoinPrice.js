//Gets some altcoin price and whatever from coinmarket cap

const cmpURL = 'https://api.coinmarketcap.com/v1/ticker/'; //URL for coinmarketcap

//Shit copied from getCryptoPrice.js, ignore for now
/*
module.exports = (

  function(channel, cryptocurrency) {

    var buyPrice;
    var sellPrice;
    var output = '';

    var buyPromise = new Promise(function(resolve, reject) {
      var buyURL = coinbaseURL + cryptocurrency + '-USD/buy';
      request(buyURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var response = JSON.parse(body);
          console.log(response);
          buyPrice = response.data.amount;
          resolve('Success 1');    
        }
        else {
          reject('Failed to look up ' + cryptocurrency + ' buy price.');
        }
      });
    });

    var sellPromise = new Promise(function(resolve, reject) {
      var sellURL = coinbaseURL + cryptocurrency + '-USD/sell';
      request(sellURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var response = JSON.parse(body);
          console.log(response);
          sellPrice = response.data.amount;
          resolve('Success 2'); 
        }
        else {
          reject('Failed to look up ' + cryptocurrency + ' sell price.');
        }
      });
    });

    Promise.all([buyPromise, sellPromise]).then(function(result) {
      output += cryptocurrency + ' on Coinbase' + '```Buy:    ' + buyPrice + ' USD\n';
      output += 'Sell:   ' + sellPrice + ' USD\n';
      output += 'Spread: ' + String((parseFloat(buyPrice) - parseFloat(sellPrice)).toFixed(2)) + ' USD```';
      channel.send(output);
    }, function(err) {
      channel.send(err);
    });

  }
)
*/
