module.exports = (

    function(client, startTime, botOwner) {
        var uptime = client.uptime / 1000;
        return `Online for ${uptime} seconds since ${startTime.toUTCString()}. Current owner is ${botOwner}.`;
    }

)
