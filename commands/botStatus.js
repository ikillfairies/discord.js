module.exports = (

    function(client, readyTime, botOwner) {
        var uptime = client.uptime / 1000;
        return `Online for ${uptime} seconds since ${readyTime.toUTCString()}. Current owner is ${botOwner}.`;
    }

)
