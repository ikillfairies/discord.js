// Create the Discord bot
const Discord = require('discord.js');
const client = new Discord.Client();

// Shitty-Bot's login credentials
const secrets = require('./secrets');
const token = secrets.token;

// Let's keep the commands separate to not clutter this file
const commands = require('./commands.js');
var botOwner = process.argv.slice(2);

// Globals for current (last message received in) channel, and text received
var channel;
var text;

client.on('ready', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is online.');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is online.`);
});

client.on('disconnect', () => {
    channel = client.channels.find('name', 'status');
    console.log('Shitty-Bot is disconnecting');
    channel.sendMessage(`${botOwner}\'s Shitty-Bot is disconnecting.`);
});

client.on('message', message => {

    // Log the conversation
    console.log(message.channel.id + ' > ' + message.author.username + ' > ' + message.content);

    // Switch to the channel the last message was sent from
    channel = client.channels.get(message.channel.id);

    // Let's use this for now, but maybe find a RegEx alternative for case insensitive string matching
    text = message.content.toLowerCase();

    // Handle stock requests
    if (text.includes('stock')) {
        commands.stock(channel, text);
    }

    // Respond to uptime request
    if (text === 'uptime') {
        channel.sendMessage(commands.uptime(client));
    }
    // lol joe
    if (text.includes(botOwner.toString().toLowerCase()) && message.author.username != 'Shitty-Bot') {
        commands.insult(channel, botOwner.toString());
    }

    if (text === '/exit') {
        commands.kill(client);
    }

});

client.login(token);
