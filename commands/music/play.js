const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

class PlayCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Plays a song.'
		});
	}

	async run(message, args) {
		if (message.member.voiceChannel) {
			if (!message.guild.voiceConnection) {
				if (!servers[message.guild.id]) {
					servers[message.guild.id] = {queue: []};
				}
				message.member.voiceChannel.join()
				.then(connection => { 
					var server = servers[message.guild.id];
					message.reply("Successfully joined.");
					//server.queue.push(args.trim());
					//Play(server, connection, message);
					//var dispatch = connection.playStream(YTDL(args.trim(), {filter: "audioonly"}));
					try {
						console.log(ytdl('https://www.youtube.com/watch?v=ncGH9ntt0YA', { filter : 'audioonly' }));
						var dispatch = connection.playStream(ytdl('https://www.youtube.com/watch?v=bTjS1H4zxGU', { filter : 'audioonly' }));
					} catch (ex) {
						message.channel.send("Could not play video");
					}
				});
			}
		}	
		else {
			message.reply("You must be in a voice channel to use this command.");
		}
		
	}
}

function Play(server, connection, message) {
	message.reply(message.guild.id);
	//server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
	server.dispatcher.on("end", function(){
		server.queue.shift();
		if (server.queue[0]) {
			Play(server, connection, message);
		}
		else {
			connection.disconnect();
		}
	});
}

module.exports = PlayCommand;