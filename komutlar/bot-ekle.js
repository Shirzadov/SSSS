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
  

	  let eklekanal = db.fetch(`eklekanal_${message.guild.id}`)
	  if(message.channel.id !== eklekanal.id) return message.channel.send(
	  	new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| Bu Komutu Yalnızca <#${eklekanal.id}> Kanalında Kullanabilirsiniz!**`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
  
	  let botID = args[0];
      if(!botID || isNaN(botID)) return message.channel.send(
      	new Discord.MessageEmbed()
      	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **| Lütfen eklemek istediğiniz botun kimliğini girin.**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
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

	  if(!discordBot.bot) return message.channel.send(
        	 new Discord.MessageEmbed()
      		.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  		.setDescription(`${emojiler.olumsuz} **| Lütfen Bot Kimliğini Girin, Kullanıcı Kimliğini Girmeyin!**`)
	  	    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	    .setTimestamp()
	  		.setFooter(client.user.username, client.user.avatarURL())
		  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  
 
	  if(bot) {
		let member = await client.users.fetch(bot.owner);
        return message.channel.send(
        	 new Discord.MessageEmbed()
        	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        	.setDescription(`${emojiler.plus} **|** \`${discordBot.tag}\` **Adlı Bot Daha Önce** \`${member.tag}\` ** Tarafından Eklenmiş\n\nBotun Durumu:** ${bot.status}`)
	 		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	 		.setTimestamp()
	  		.setFooter(client.user.username, client.user.avatarURL())
		  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	 }
	
	  db.add(`serverData.${message.guild.id}.waitSize`, 1)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.owner`,  message.author.id)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "`Bekliyor` <a:yukleniyor:839638632729804800>")
	   
      let sira = db.fetch(`serverData.${message.guild.id}.waitSize`) || 0;
	let logkanal = db.fetch(`logkanal_${message.guild.id}`)
	 const embed = new Discord.MessageEmbed()
	  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  .setDescription(`Sisteme Bir Bot Eklendi, Bu Bot İle Sırada Toplam **${sira}** Bot Mevcut!`)
	  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  .addField("**Gönderen hakkında**",`${message.author} (**${message.author.tag}**)`)
	  .addField("**Bot hakkında**", `\`${discordBot.tag}\`(**${discordBot.id}**)`)
	  .setTimestamp()
	  .setFooter(client.user.username, client.user.avatarURL())
	  .setColor(message.guild.me.displayColor)
	  client.channels.cache.get(logkanal.id).send(message.author, embed);

	  let modrole = db.fetch(`modrole_${message.guild.id}`)
	  let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
	  const embed2 = new Discord.MessageEmbed()
	  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  .setDescription(`${emojiler.plus} **|** [0 Yetki Ekle](https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0) **Sisteme Yeni Bot Eklendi**`, true)
	  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  .addField("**Gönderen hakkında**",`${message.author} (**${message.author.tag}**)`)
	  .addField("**Bot hakkında**", `\`${discordBot.tag}\`(**${discordBot.id}**)`)
	  .addField(`**Onaylamak İçin**`, `\`${ayarlar.prefix}bot-onayla ${botID}\``)
	  .setTimestamp()
	  .setFooter(client.user.username, client.user.avatarURL())
	  .setColor(message.guild.me.displayColor)
	  client.channels.cache.get(yetkilikanal.id).send(`<@&${modrole}>`, embed2);
        message.react(emojiler.onay)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "bot-ekle",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
