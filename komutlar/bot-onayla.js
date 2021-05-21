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
//----------------------------------------------------------------------
		let modrole = db.fetch(`modrole_${message.guild.id}`)
	  if(!message.member.roles.cache.has(modrole)) return message.channel.send(
	  	new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| Bu Komutu Kullanmak İçin** <@&${modrole}> **Rolüne Sahip Olmalısın!**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
	  	let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
      if(message.channel.id !== yetkilikanal.id) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **| Bu Komutu Sadece** <#${yetkilikanal.id}> **Kanalında Kullanabilirsin!**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
	  let botID = args[0];
      if(!botID || isNaN(botID)) return message.channel.send(
        new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **| Onaylamak İstediğiniz Botun Kimliğini Belirtin!**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
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
//----------------------------------------------------------------------
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  if(!bot) return message.channel.send(
        new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| ${discordBot.username}** **Adlı Bot Daha Önce Sisteme Eklenmiş**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
			//Bot Data Base Durumunu Onaylı Olarak Gosterir
      if(bot.status == "`Onaylandı` <:onay:839619314176491541>") {
		  if(!message.guild.members.cache.get(botID)){
			  return message.channel.send(
   		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
		.setDescription(`\`${discordBot.username}\` **Bot Onaylandı Ancak Sunucuda Bulunmuyor!**`)
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
		.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
		  }
//----------------------------------------------------------------------
			//Onayli Geri Dönüşü
		   return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
		.setDescription(`${emojiler.olumsuz} \`| ${discordBot.username}\` **Adlı Bot Zaten Onaylandı!**`)
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
		.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  }
//----------------------------------------------------------------------
			//Data Base Ekle Ayarla
	  let memberData = await client.users.fetch(bot.owner)
	  let developer = db.fetch(`developer_${message.guild.id}`)
	  let botrol = db.fetch(`botrol_${message.guild.id}`)
      if(!message.guild.members.cache.get(bot.owner)) return message.channel.send(embed.setDescription(`${emojiler.olumsuz} **| ${memberData.username}** **İsimli Kullanıcı Sunucudan Çıktığı için Bot Onaylanamıyor!**`));
	 message.guild.members.cache.get(bot.owner).roles.add(developer)
	   message.guild.members.cache.get(botID).roles.add(botrol)

    if(bot.status == "`Bekliyor` <a:yukleniyor:839638632729804800>")  db.substr(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "`Reddedildi` <:minus:839982244545429514>")  db.substr(`serverData.${message.guild.id}.redSize`, 1)
	  db.add(`serverData.${message.guild.id}.succSize`, 1)
	  db.add(`toplambot.`, 1)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "`Onaylandı` <:check:839982244042768416>")
	   message.react(emojiler.onay)
//----------------------------------------------------------------------
	   	   	//Genel Log Kanali
	   	let logkanal = db.fetch(`logkanal_${message.guild.id}`)
	 	const embed2 = new Discord.MessageEmbed()
	 	.setAuthor(client.user.username, client.user.avatarURL())
	 	.setDescription(`${emojiler.onay} **|** \`${discordBot.tag} (${discordBot.id})\` **Adlı Bot Başarılı Bir Şekilde Onaylandı!**\n\n**Sahip Hakkında**\n${memberData} (**${memberData.tag}**)`)
	 	.setTimestamp()
	    .setFooter(client.user.username, client.user.avatarURL())
	    .setColor(message.guild.me.displayColor)
	  message.guild.channels.cache.get(logkanal.id).send(memberData, embed2)

//----------------------------------------------------------------------
	  //Yetkili Log
	  let yetkililog = db.fetch(`yetkililog_${message.guild.id}`)
	  let yetkililog1 = yetkililog.id
	 	const embed = new Discord.MessageEmbed()
	 	.setAuthor(client.user.username, client.user.avatarURL())
	 	.setDescription(`${emojiler.onay} **|** \`${discordBot.tag} (${discordBot.id})\` **Adlı Bot Başarılı Bir Şekilde Onaylandı!**\n\n**Sahip Hakkında**\n${memberData} (**${memberData.tag}**)\n\n**Onaylayan Yetkili Hakkında:**\n${message.author} (**${message.author.id}**)`)
	 	.setTimestamp()
	    .setFooter(client.user.username, client.user.avatarURL())
	    .setColor(message.guild.me.displayColor)
	  message.guild.channels.cache.get(yetkililog1).send(embed)
//----------------------------------------------------------------------



};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot-onayla",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
