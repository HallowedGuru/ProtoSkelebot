const commando = require('discord.js-commando');

class HeadpatCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'headpat',
			group: 'simple',
			memberName: 'headpat',
			description: 'Gives headpats.'
		});
	}

	async run(message, args) {
		message.reply("Incoming headpats...");
		var index = randomNumber(1, 14);
		message.channel.send("", {
  			files: [
				"./images/headpat" + index + ".gif"
			]
		});
	}
}

function randomNumber(min, max) {
	var diff = max - min;
	var result = Math.floor((Math.random() * diff) + 1) + min;
	return result.toString();
}

module.exports = HeadpatCommand;