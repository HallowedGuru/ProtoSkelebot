const commando = require('discord.js-commando');

class PickCommand extends commando.Command {
	constructor(client) {
		super(client,{
			name: 'pick',
			group: 'simple',
			memberName: 'pick',
			description: 'Picks a random item from a provided list.'
		});
	}

	async run(message, args) {
		var items = args.split(", ");
		message.channel.send("Picking a random item from your list...");
		var itemIndex = Math.floor(Math.random() * items.length);
		var pickResult = items[itemIndex];
		message.channel.send("I pick " + pickResult);
	}
}

module.exports = PickCommand;