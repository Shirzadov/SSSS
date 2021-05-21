const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)

exports.run = async (client, message, args) => {
		message.delete({timeout: 5000})
			 let botlist = db.fetch(`botlist_${message.guild.id}`)
	 if(!botlist) return message.channel.send(
	 	new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| Bu Sunucuda Sistem Aktif Değil. ${ayarlar.prefix}botlist**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()//❌ | Sunucuda sistem aktif değil.
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	let botID = args[0]
	const embed = new Discord.MessageEmbed()
	.setColor(message.guild.me.displayColor)
	.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	.setTimestamp()
	.setFooter(client.user.username, client.user.avatarURL())
	 if(!botID || isNaN(botID)) return message.channel.send(
 		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	 	.setDescription(`${emojiler.olumsuz} **| Lütfen Bilgi Edinmek İstediğiniz Botun Kimliğini Girin!**`)
	 	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	 	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	 let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(
        new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${emojiler.olumsuz} **| Discord Apide Böyle Bir Bot Bulamadım.**`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  }	
	 
	 if(!bot) return message.channel.send(embed.setDescription(`${emojiler.olumsuz} **| Sistemde** \`${discordBot.username}\` **Bot Adını Bulamadım.**`))
	   let ownerName = await client.users.fetch(bot.owner);
	  embed.addField("Bot Adı /İD", `\`${discordBot.username}\`(**${discordBot.id}**)`)
	  .addField("Bot Sahibi",`\`${ownerName.username}\`(**${ownerName.id}**)`)
	  .addField("Bot Durumu", 
	  bot.status == "`Onaylandı` <:check:839982244042768416>" && !message.guild.members.cache.get(botID) 
	  ? "`Onaylandı` <:onay:839619314176491541>" 
	  : bot.status == "`Reddedildi` <:minus:839982244545429514>" && message.guild.members.cache.get(botID)  
	  ? "`Reddedildi` <:minus:839982244545429514>"  
	  : bot.status == "`Bekliyor` <a:yukleniyor:839638632729804800>"  && message.guild.members.cache.get(botID)
	  ? "`Bekliyor` <a:yukleniyor:839638632729804800>"
	  : bot.status)
	  if(bot.status == "`Reddedildi` <:minus:839982244545429514>") embed.addField("Neden Reddedildi", `\`${bot.redReason}\``)
	 message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot-bilgi",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
