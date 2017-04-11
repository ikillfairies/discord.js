const request = require('request'); // Used for JSON parsing
const stockURL = 'http://finance.google.com/finance/info?client=ig&q=';
const insultURL = 'http://quandyfactory.com/insult/json';

// Note: You must pass channel in explicitly when doing an asynch JSON request
module.exports = {
  
  // Stock - see http://www.jarloo.com/real-time-google-stock-api/ for API documentation
  stock: function(channel, ticker) {
    ticker = ticker.replace(' ', '');
    ticker = ticker.replace('stock', '');
    ticker = ticker.toUpperCase();
    // Ignore the keyword 'stock' if the phrase is longer than 5 characters.
    if (ticker.length < 6) {
      // Log the request to the console for debugging purposes
      console.log('Stock request received for: ' + ticker);
      // Request the stock information from the API in JSON format
      request(stockURL + ticker, (error, response, body) => {
        // Wrap the request in a try because bitches might pass invalid tickers
        try {
          // I need to clean the string, why the fuck does this API format their shit so weird?
          var parsedBody = body.split('[')[1].split(']')[0];
          if (!error && response.statusCode === 200) {
            var response = JSON.parse(parsedBody);
            channel.sendMessage('Last price for ' + ticker + ': ' + response.l);
          } 
          else {
            channel.sendMessage('Got an error: ', error, ', status code: ', response);
          }
        }
        catch(err) {
          channel.sendMessage('Unable to look up "' + ticker + '".');
        }
      })
    }
  },
  
  // Uptime - tell me how long the bot's been online, or more importantly if it's actually online
  uptime: function(client) {
    // To do: make this fancier and actually tell you what time the bot came online
    var uptime = client.uptime / 1000;
    return 'Online for ' + uptime + ' seconds.';
  },
  
  // Insult - generate an Elizabethan insult and send it (to joe)
  insult: function(channel) {
    console.log('Retrieving an Elizabethan insult');
    request(insultURL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var response = JSON.parse(body);
        channel.sendMessage('Joe, ' + response.insult);
      } 
      else {
        channel.sendMessage('Got an error: ', error, ', status code: ', response);
      }
    })
  }

}