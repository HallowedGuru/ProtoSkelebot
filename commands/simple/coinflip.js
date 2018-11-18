const commando = require('discord.js-commando');

class CoinflipCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'coinflip',
			group: 'simple',
			memberName: 'coinflip',
			description: 'Flips a coin, landing on Heads or Tails.'
		});
	}

	async run(message, args) {
		message.channel.send("Flipping a coin...");
		var coinResult = Math.round((Math.random()));
		if (coinResult == 0) {
			message.channel.send("Heads");
		}
		else {
			message.channel.send("Tails");
		}
	}
}

module.exports = CoinflipCommand;