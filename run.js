const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');
const stockPattern = /\$[a-z]{1,5}/gi;

var botOwner = String(process.argv.slice(2));

var channel;
var text;
var startTime;

client.on('ready', () => {
    startTime = new Date();
    channel = client.channels.find('name', 'status');
    console.log(`${botOwner}\'s Shitty-Bot is online.`);
    if (botOwner === '') {
        botOwner = "Jeff";
    }
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is disconnecting');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is disconnecting.`);
});

client.on('message', message => {

    console.log(message.channel.id + ' > ' + message.author.username + ' > ' + message.content);

    if (message.author.username === 'Shitty-Bot') return; // Ignore messages sent 
    channel = client.channels.get(message.channel.id); // Switch to the channel the last message was sent from
    text = text = message.content.toLowerCase(); // To do: Find a better way to handle case sensitivity

    var match;
    while ((match = stockPattern.exec(text)) !== null){
        console.log(`found ${match[0]}`);
        commands.getStockPrice(channel, match[0]);
    }

    // Shutdown needs to go first, if shutdown is called ignore everything else
    // To do: fix that damn error message when we shut down
    if (text === '/shutdown ' + botOwner.toLowerCase()) {
        channel.sendMessage(`${botOwner}\'s Shitty-Bot Shutting down.`);
        client.destroy();
    }

    else if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client, startTime));
    }

    else if (text.includes('stock')) {
        text = '$' + text.replace('stock', '').replace(' ', '');
        if (text.length < 6) commands.getStockPrice(channel, text);
    }

    else if (text.includes(botOwner.toString().toLowerCase())) {
        commands.insult(channel, botOwner);
    }

});

client.login(token);
