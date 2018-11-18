const commando = require('discord.js-commando');

class IlyCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'ily',
			group: 'simple',
			memberName: 'ily',
			description: 'Sends an ily.'
		});
	}

	async run(message, args) {
		message.reply("ily2");
	}
}

module.exports = IlyCommand;