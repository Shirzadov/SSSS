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
	  	.setDescription(`${emojiler.olumsuz} **|** **Bu Komutu Kullanmak İçin** <@&${modrole}> **Rolüne Sahip Olmalısın!**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  	let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
//----------------------------------------------------------------------
      if(message.channel.id !== yetkilikanal.id) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **|** **Bu Komutu Sadece** <#${yetkilikanal.id}> **Kanalında Kullanabilirsin!**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));  let botID = args[0];
      let redReason = args.slice(1).join(' ');
//----------------------------------------------------------------------
      if(!botID || isNaN(botID)) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription("Reddetmek istediğiniz Botun kimliğini belirtin.")
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));  
//----------------------------------------------------------------------
	  if(!redReason) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription("Lütfen Bir Sebep Belirtiniz.")
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));  
	  let discordBot = null;
//----------------------------------------------------------------------
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(        
        new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${emojiler.olumsuz} **|** Discord Apide Böyle Bir Bot Bulamadım.**`)
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
	  	.setDescription(`${emojiler.olumsuz} **|** \`${discordBot.username}\` **Adlı Bot Daha Önce Sisteme Eklenmemiş!**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
	  if(bot.status == "`Reddedildi` <:minus:839982244545429514>")  return message.channel.send(
	  	new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **|** \`${discordBot.username}\` **Adlı Bot Zaten Reddedildi!**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  
//----------------------------------------------------------------------
	  if(bot.status == "`Bekliyor` <a:yukleniyor:839638632729804800>")  db.delete(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "`Onaylandı` <:onay:839619314176491541>")  db.delete(`serverData.${message.guild.id}.succSize`, 1)
       let memberData = await client.users.fetch(bot.owner)
    let developer = db.fetch(`developer_${message.guild.id}`)
    let botrol = db.fetch(`botrol_${message.guild.id}`)
       if(message.guild.members.cache.get(bot.owner)) message.guild.members.cache.get(bot.owner).roles.remove(developer)
       if(message.guild.members.cache.get(botID)) message.guild.members.cache.get(botID).roles.remove(botrol)
	   db.add(`serverData.${message.guild.id}.redSize`, 1);
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "`Reddedildi` <:minus:839982244545429514>")
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.redReason`, redReason)
//----------------------------------------------------------------------
	   	   	//Genel Log Kanali
		let logkanal = db.fetch(`logkanal_${message.guild.id}`)
	 	const embed2 = new Discord.MessageEmbed()
	   .setAuthor(client.user.username, client.user.avatarURL())
	   .setDescription(`${emojiler.olumsuz} **|** \`${discordBot.tag} (${discordBot.id})\` **Adlı Bot Reddedildi!**\n\n**Sebep:** \`${redReason}\` \n\n**Sahip Hakkında:**\n${memberData} (**${memberData.tag}**)`)
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
	 	.setDescription(`${emojiler.olumsuz} **|** \`${discordBot.tag} (${discordBot.id})\` **Adlı Bot** ${message.author} **Adlı Yetkili Tarafından Reddedildi!**\n\n**Sebep:** \`${redReason}\`\n\n**Sahip Hakkında:**\n${memberData} (**${memberData.tag}**)`)
	 	.setTimestamp()
	 	.setTimestamp()
	    .setFooter(client.user.username, client.user.avatarURL())
	    .setColor(message.guild.me.displayColor)
	  message.guild.channels.cache.get(yetkililog1).send(embed)
//----------------------------------------------------------------------
	   message.react(emojiler.onay)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot-reddet",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
