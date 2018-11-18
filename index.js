const Commando = require('discord.js-commando');
const bot = new Commando.Client({
	commandPrefix: '!'
});

const BOT_TOKEN = process.env.TOKEN;

bot.registry.registerGroup('simple', 'simple');
bot.registry.registerGroup('music', 'music');
bot.registry.registerGroup('conversion', 'conversion');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

bot.login(BOT_TOKEN);

bot.on('ready', function(){
	bot.user.setPresence({
        game: {
            name: '!help | @Skelebot help',
            type: 0
        }
    });
    console.log('Ready!');
});

bot.on('message', function(message){
	
});
