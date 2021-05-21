const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)
exports.run = async (client, message, args) => {
		    if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.author.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| Botu Kullanmadan Önce Lütfen \`Yönetici\` Yetkisi Veriniz**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()//❌ | Sunucuda sistem aktif değil.
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
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
	  	
	 let succSize = db.get(`serverData.${message.guild.id}.succSize`) || 0;
	 let waitSize = db.get(`serverData.${message.guild.id}.waitSize`) || 0;
	 let redSize = db.get(`serverData.${message.guild.id}.redSize`) || 0;
	   
	 const embed = new Discord.MessageEmbed()
	  .setColor(message.guild.me.displayColor)
	  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	  .setTimestamp()
	  .setDescription(`${emojiler.bot} **| Toplam Botlar:** **${succSize + waitSize + redSize}**\n**${emojiler.onay} | Onaylanmış Botlar:** **${succSize}**\n**${emojiler.loading} | Bekleyen Botlar:** **${waitSize}**\n**${emojiler.olumsuz} | Reddedilen Botlar:** **${redSize}**`)
	  .setFooter(client.user.username, client.user.avatarURL())
     message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "grafik",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
