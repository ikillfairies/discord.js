module.exports = (

    function(client, readyTime, botOwner) {
        var uptime = client.uptime / 1000;
        return `Online since ${readyTime.toUTCString().split(', ')[1]} (${uptime} seconds). Current owner is ${botOwner}.`;
    }

)
