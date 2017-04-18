module.exports = (

    function(client, readyTime, botOwner) {

        var uptime = Math.floor(client.uptime / 1000);
        
        if (uptime < 60) uptime += 's';
        else if (uptime >= 60 && uptime < 3600) {
            uptime = Math.floor(uptime / 60) + 'm ' + (uptime % 60) + 's'; 
        }
        else {
            uptime = Math.floor(uptime / 3600) + 'h ' + Math.floor((uptime / 60) % 60) + 'm ' + (uptime % 60) + 's'; 
        }

        return 'Current uptime status: ```'
          + 'Start Time: ' + readyTime.toUTCString().split(', ')[1] + '\n'
          + 'Uptime:     ' + uptime + ' \n'
          + 'Host:       ' + botOwner + '```';
    }

)
