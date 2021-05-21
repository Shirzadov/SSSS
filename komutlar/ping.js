const Discord = require("discord.js")


exports.run = async (client, message, args) => {


  message.delete()
 message.channel.send(
  
  new Discord.MessageEmbed()
	  	.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
	  	.setDescription(`

> API Latency ${Math.round(client.ws.ping)}ms
`)
	  	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	  	.setTimestamp()//❌ | Sunucuda sistem aktif değil.
	  	.setFooter(client.user.username, client.user.avatarURL())
	  	.setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ping",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
