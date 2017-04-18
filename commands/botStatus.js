module.exports = (

    function(client, readyTime, botOwner) {
        var uptime = client.uptime / 1000;
        return 'Current uptime status:```'
          + 'Start Time: ' + readyTime.toUTCString().split(', ')[1] + '\n'
          + 'Uptime:     ' + uptime + ' seconds \n'
          + 'Host:       ' + botOwner + '```';
    }

)
