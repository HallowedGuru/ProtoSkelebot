const commando = require('discord.js-commando');

class KYSCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'kys',
			group: 'simple',
			memberName: 'kys',
			description: 'Retaliates to toxicity.'
		});
	}

	async run(message, args) {
		message.reply("no u");
	}
}

module.exports = KYSCommand;