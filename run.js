const Discord = require('discord.js');
const client = new Discord.Client();

const secrets = require('./secrets');
const token = secrets.token;

const commands = require('./commands.js');

var channel;
var text;
var startTime;

client.on('ready', () => {
  startTime = new Date();
  console.log('Shitty-Bot online');
});

client.on('disconnect', () => {
  startTime = new Date();
  console.log('Shitty-Bot offline');
});

client.on('message', message => {
  
  console.log(message.channel.id + ' > ' + message.author.username + ' > ' + message.content);
  
  channel = client.channels.get(message.channel.id); // Switch to the channel the last message was sent from
  text = message.content.toLowerCase(); // To do: Find a better way to handle case sensitivity
  
  if (text.includes('stock')) {
    commands.getStockPrice(channel, text);
  }
  
  if (text === 'uptime') {
    channel.sendMessage(commands.uptime(client, startTime));
  }
  
  if (text.includes('joe') && message.author.username != 'Shitty-Bot') {
    commands.insultJoe(channel);
  }
  
  if (text === '/shutdown') {
    channel.sendMessage('Shutting down.');
    client.destroy(); 
  }
  
});

client.login(token);
