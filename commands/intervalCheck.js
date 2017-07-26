module.exports = (

  function(channel, timeout, commands, cryptocurrency, limit) {

    var intervalCheck = setInterval(priceCheck, timeout);
    console.log('intervalCheck started');

    function priceCheck() {
      var buyPrice = commands.getCryptoPrice(channel, cryptocurrency, true);
      console.log(buyPrice);
      if (buyPrice < limit) {
        channel.send(cryptocurrencey + ' is below ' + limit);
        commands.getCryptoPrice(channel, cryptocurrency);
      }
    }

  }

)
