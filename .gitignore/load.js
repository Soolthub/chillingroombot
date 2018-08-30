/**
 * Fixes possible errors in emoji strings by matching them to a pattern.
 * @param {String} emojiDiscriminator The string from the config file.
 * @returns {*} A proper emojiDiscriminator or null.
 */
function cleanEmojiDiscriminator(emojiDiscriminator) {
	var regEx = /[A-Za-z0-9_]+:[0-9]+/;
	var cleaned = regEx.exec(emojiDiscriminator);
	if (cleaned) return cleaned[0];
	return emojiDiscriminator;
}

/**
 * Fetches all messages that need to be tracked into the cache. Makes sure each message is having the proper reactions attached.
 * @param {*} client The bot client.
 * @param {*} config The config file.
 */
module.exports = function(client, config) {

	client
		.on("ready", () => {
			// Console Bot a lancé.
    		console.log('Bot lancé.');
			//console.log("Remarque: Si le message suivant ne dit pas "ASYNC IIFE working!", Vous devez mettre à jour le noeud 7.6.0 ou plus tard");
			
			//Infos bot 
			client.user.setPresence('!chill pour en savoir plus').catch(console.error);
			console.log("Message le bot joue a !chill");
			
			(async () => {
				var debug_count_messagesFetched = 0;
				console.log("ASYNC IIFE fonctionnel!");
				for (var { channel, message: message_id, reactions } of config) {
					var message = await client.channels.get(channel).fetchMessage(message_id)
						.catch(error => console.error(error));
					if (!message) continue;
					debug_count_messagesFetched += 1;
					for (var {emoji} of reactions) {
						emoji = cleanEmojiDiscriminator(emoji);
						var messageReaction = message.reactions.get(emoji);
						if (!messageReaction) {
							await message.react(emoji)
								.catch(error => console.error(error));
							//No fetch necessary since no prior existing reactions.
						} else {
							if (!messageReaction.me) {
								//Fetch each reaction into cache to keep track of them
								messageReaction.fetchUsers();
								await message.react(emoji)
									.catch(error => console.error(error));
							}
						}
					}
				}
				//console.log(`Aller chercher ${debug_count_messagesFetched} message(s).`);
				console.log(
        `Le Bot a demarrer, avec ${client.users.size} utilisateurs, dans ${
            client.channels.size
        } channels de ${client.guilds.size} serveurs.`
    );
			})();
		});
};
