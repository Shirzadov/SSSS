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
	  	let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
      if(message.channel.id !== yetkilikanal.id) return message.channel.send(
		new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      	.setDescription(`${emojiler.olumsuz} **| Bu Komutu Sadece** <#${yetkilikanal.id}> **Kanalında Kullanabilirsin!**`)
      	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  const embed = new Discord.MessageEmbed()
     .setColor(message.guild.me.displayColor)
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 
		let modrole = db.fetch(`modrole_${message.guild.id}`)
	  if(!message.member.roles.cache.has(modrole)) return message.channel.send(
	  	new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`${emojiler.olumsuz} **| Bu Komutu Kullanmak İçin** <@&${modrole}> **Rolüne Sahip Olmalısın!**`)
	  	.setTimestamp()
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
	  let obj = await db.get(`serverData.${message.guild.id}.botsData`) || {}
	  let veri = Object.keys(obj).map(botID => {
		return {
		  ID: botID,
		  durum: obj[botID].status
		};
	  }).filter(data => data.durum == "`Bekliyor` <a:yukleniyor:839638632729804800>")
	  if(veri.length <= 0) return message.channel.send(embed.setDescription(`> ${emojiler.olumsuz} **Onay Bekleyen Her Hangi Bir Bot Yok**`)) 
	  
	 return message.channel.send(embed .setDescription(
`> Sistemde Şimdi Toplam **${veri.length}** Bot Onay Bekliyor! \n\n`+
	  veri.map(data => `>  (**${data.ID}**) | [Botu Ekle (0)](https://discord.com/oauth2/authorize?client_id=${data.ID}&scope=bot&permissions=0) `).join("\n"))
	  )
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "onay-bekleyenler",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
