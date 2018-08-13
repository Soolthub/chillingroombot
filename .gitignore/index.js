const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

const prefix = '*';

var load = require("./src/load");
load(bot, config);

var track = require("./src/track");
track(bot, config);

bot.on('message', function (message){

    const msg = message.content.toUpperCase();
    const sender = message.author;
    const cont = message.content.slice(prefix.length).split(" ");
    const args = cont.slice(1);
    
    if(message.content ==="!chill"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#DDFF09")
        .setTitle("LA CHILL LIST")
        .setDescription("Voici la liste des commandes")
        .addField("!demande", "Pour une demande de rôle `Newbie` aux Dieux")
        .addField("!infos", "Pour afficher tes statistiques d'utilisateur")
        .addField("!role", "Pour afficher les types de rôles")
        .setFooter("_________infosbulle chillienne_________")
        message.channel.sendMessage(help_embed);
        console.log("Un utlisateur a effectué la commande CHILL!")
        message.guild.channels.find("name", "infos").sendMessage("Commande `!chill` testée par " + message.author.toString());
    }

    if(message.content ==="!infos"){
        if(message.member.roles.some(r=>["Dieu" , "Newbie" , "Demi-Dieu"].includes(r.name)) ) {
        var help_embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("Voici tes stats!")
        .setColor("#DDFF09")
        .addField("Ton Nom utulisateur", `${message.author.username}${message.author.discriminator}`)
        .addField("Ton ID de compte", message.author.id)
        .addField("Ton compte a été crée le", message.author.createdAt)
        .addField("Fuseau horairetamp", message.author.createdTimestamp)
        .setThumbnail(message.author.avatarURL)
        .setFooter("_________infosbulle chillienne_________")
        message.channel.sendMessage(help_embed);
        console.log("Un utlisateur a effectué la commande INFOS !")

        } else {
        message.channel.send('Tu as besoin du role \`Newbie\` ou \`Demi-Dieu\` pour utiliser cette commande.');
        }

        message.guild.channels.find("name", "infos").sendMessage("Commande `!infos` testée par " + message.author.toString());
    }

    if(message.content ==="!role"){  
        if(message.member.roles.some(r=>["Dieu" , "Newbie" , "Demi-Dieu"].includes(r.name)) ) {
        var help_embed = new Discord.RichEmbed()
        .setDescription("Voici les types de rôles!")
        .setColor("#DDFF09")
        .addField("`ready`", "pour avoir le droit de communiquer")
        .addField("`block`", "te bloque l'accès aux salons")
        .addField("`games`", "pour avoir l'accès aux salons de jeux")
        .addField("`coin détente`", "pour avoir l'accès au salon textuel coin détente")
        .addField("`chilling room`", "pour avoir l'accès au salon vocal chilling room")
        .addField("`Newbie`" , "pour avoir plus de contenu")
        .setFooter("_________infosbulle chillienne_________")
        message.channel.sendMessage(help_embed);
        console.log("Un utlisateur a effectué la commande ROLE !")

        } else {
        message.channel.send('Tu as besoin du rôle \`Newbie\` ou \`Demi-Dieu\` pour utiliser cette commande.');
        }

        message.guild.channels.find("name", "infos").sendMessage("Commande `!role` testée par " + message.author.toString());
    }

    if(message.content ==="!demande"){
        if (!message.member.roles.find('name', 'en attente de role')) {
                message.channel.send('Tu as besoin du rôle \`en attente de role\` pour utiliser cette commande.');
                return; 
            }
            message.guild.channels.find("name", "infos").sendMessage("Demande de changement de role `en attente de role` ==> `Newbie` à  \n\n **Envoyer après la demande de rôle** `Newbie` ``` **Bienvenue dans la team !!! Maintenant tu as le rôle** `Newbie` ```" + message.author.toString());
            message.author.sendMessage("Une demande de rôle `Newbie` à été transmise aux Dieux");
            message.guild.channels.find("name", "infos").sendMessage("Commande `!demande` testée par " + message.author.toString());
    }

    if (msg === prefix + 'ADMIN') {
            if (!message.member.roles.find('name', 'Dieu')) {
                message.channel.send('Tu as besoin du rôle \`Dieu\` pour utiliser cette commande.');
                return;
            }
        var help_embed = new Discord.RichEmbed()
        .setColor("#DDFF09")
        .setTitle("LISTE DES COMMANDES")
        .addField("!chill", "Pour afficher les infos")
        .setDescription("Voici la liste des commandes")
        .addField("*ping" ,"Pour jouer au Ping/Pong")
        .addField("*purge", "Pour effacer les messages")
        .addField("*role", "Pour la demande de rôle")
        .setFooter("_________infosbulle chillienne_________")
        message.channel.sendMessage(help_embed);
        console.log("Commande ADMIN testée");
        message.guild.channels.find("name", "infos").sendMessage("Commande ADMIN `*admin` testée par " + message.author.toString());
    }

    if (msg === prefix + 'ROLE') {
        message.delete();
        if (!message.member.roles.find('name', 'Dieu')) {
                message.channel.send('Tu as besoin du rôle \`Dieu\` pour utiliser cette commande.');
                return; 
            }
        message.channel.send("L'ensemble des salons textuels et vocaux sont cachés pour une meilleure utilisation du serveur. \n\n`Tu peux donc choisir la façon de t'informer des news et de l'actu du serveur ChillBot et ainsi bénéficier d'une meilleure visibilité sur le discord. Réponds aux questions suivantes en cliquant sur les émojis sous la question.` \n\n*Cliques sur une ou plusieurs émotes et ton rôle discord sera mis à jour automatiquement. Recliques dessus pour annulé ton choix. C'est super simple !*");
        message.channel.send("__**Pour chiller !!!**__\n\n ✅ | Pour accèder au contenu \n\n\n ⬇️Cliques juste en dessous pour indiquer ta réponse ⬇️")
        message.channel.send("__**À  quels channels souhaites tu accéder ?**__ \n\n 😆 | Pour du partages et des délires \n 🍺 | Pour chiller entre potes \n 🎮 | Pour geeker à mort ! \n 🎧 | **Divers** Salon musique \n 😎 | **Divers** Salon jeux vidéo \n 📺 | **Divers** Salon séries films \n\n\n ⬇️ Cliques juste en dessous pour indiquer ta réponse ⬇️")
        message.guild.channels.find("name", "infos").sendMessage("Commande ADMIN `*role` testée par " + message.author.toString());         
    } 

    if (msg.startsWith(prefix + 'PURGE')) {
        async function purge() {
            message.delete();
            if (!message.member.roles.find('name', 'Dieu')) {
                message.channel.send('Tu as besoin du rôle \`Dieu\` pour utiliser cette commande.');               
                return; 
            }

            if (isNaN(args[0])) {
                message.channel.send('Utilise un chiffre après ton argument. \nExemple: ' + prefix + 'purgeESPACE10 (pour enlever les 10 messages précédents)');
                return;
            }
            
            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages trouvés, supprimés...');

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

        }

        purge();
        message.guild.channels.find("name", "infos").sendMessage("Commande ADMIN `*purge` testée par " + message.author.toString());   
        console.log("Commande PURGE testée");
    }

    if (msg === prefix + 'PING') {
        message.channel.send('🏓 Pong!');
        message.reply('🏓 Pong!'); 
        message.guild.channels.find("name", "infos").sendMessage("Commande ADMIN `*ping` testée par " + message.author.toString());   
        console.log("Commande PING testée");
    }

});

bot.on('guildMemberAdd', member => {

    console.log('Lutilisateur' + member.user.username + ' a rejoint le sereur ChillingRoom !')
    member.guild.channels.find('name', 'infos').sendMessage(member.toString() + " est arrivé sur le Discord !!!");
    member.createDM().then(function (channel){
        return channel.send('Salut à toi et bienvenu sur le Discord Chilling Room. Va faire un tour sur le channel #règles pour en savoir plus 😉')
    })
    let role = member.guild.roles.find('name' ,'en attente de role');
    member.addRole(role).catch(console.error);
})

bot.login(process.env.TOKEN);
