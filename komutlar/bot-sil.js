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

	  	
    	let botID = args[0]
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
	  	let deleteReason = args.slice(1).join(' ');
	  	let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
//----------------------------------------------------------------------
      if(message.channel.id !== yetkilikanal.id) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **|** **Bu Komutu Sadece** <#${yetkilikanal.id}> **Kanalında Kullanabilirsin!**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
		 if(!botID || isNaN(botID)) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
		.setDescription(`${emojiler.olumsuz} **|** **Lütfen Silmek İstediğiniz Botun Kimliğini Girin**`)
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
		if(!deleteReason) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **|** **Lütfen Bir Sebep Belirtiniz.**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000})); 
		 let bot = db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	     let discordBot = null;
//----------------------------------------------------------------------
         try {
	    	 discordBot = await client.users.fetch(botID);
	     }	catch {
            return message.channel.send(
        new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`${emojiler.olumsuz} **|** **Discord Apide Böyle Bir Bot Bulamadım.**`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	     }	

//----------------------------------------------------------------------
			//Data Base Ekle Ayarla
		 if(!bot) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
		.setDescription(`${emojiler.olumsuz} **|** **Sistemde** \`${discordBot.username}\` **Adında Bot Bulamadım.**`)
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    	.setTimestamp()
	 	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor))
    if(bot.status == "`Onaylandı` <:check:839982244042768416>") db.substr(`serverData.${message.guild.id}.succSize`, 1)
	  if(bot.status == "`Bekliyor` <a:yukleniyor:839638632729804800>")  db.substr(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "`Reddedildi` <:minus:839982244545429514>")  db.substr(`serverData.${message.guild.id}.redSize`, 1)
    
    db.delete(`serverData.${message.guild.id}.botsData.${botID}`);
     message.react(emojiler.onay)

//----------------------------------------------------------------------
	   	   	//Genel Log Kanali
     let memberData = await client.users.fetch(bot.owner)

     let logkanal = db.fetch(`logkanal_${message.guild.id}`)
       	 const embed2 = new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, client.user.avatarURL())
    	.setDescription(`${emojiler.olumsuz} **|** \`${discordBot.username} (${discordBot.id})\` **Adlı Bot Sistemden Silindi!**\n\n**Sebep:** \`${deleteReason}\`\n\n**Sahip Hakkında**\n${memberData} (**${memberData.tag}**)`)
    	.setTimestamp()
	 	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)
		 message.guild.channels.cache.get(logkanal.id).send(memberData, embed2)

//----------------------------------------------------------------------
	  //Yetkili Log
    let yetkililog = db.fetch(`yetkililog_${message.guild.id}`)
	   message.guild.channels.cache.get(yetkililog.id).send(
	 	new Discord.MessageEmbed()
	 	.setAuthor(client.user.username, client.user.avatarURL())
	 	.setDescription(`${emojiler.olumsuz} **|** \`${discordBot.tag} (${discordBot.id})\` **Adlı Bot Sistemden Silindi!**\n\n**Sebep:** \`${deleteReason}\`\n\n**Sahip Hakkında**\n${memberData} (**${memberData.tag}**)\n\n**Yetkili Hakkında:**\n${message.author} (**${message.author.id}**)`)
	 	.setTimestamp()
	    .setFooter(client.user.username, client.user.avatarURL())
	    .setColor(message.guild.me.displayColor))

//----------------------------------------------------------------------
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot-sil",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
