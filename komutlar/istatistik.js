const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)
const moment = require(`moment-duration-format`)
exports.run = (client, message, args) => {
let toplambot = db.fetch(`toplambot.`) || 'İşlem Yapılmamış.'
let kuralkabul = db.fetch(`kural`) || 'Kural Kabul Edilmemiş.'
let toplamaciksistem = db.fetch(`aciksistem.`) || 'Sistem Açılmamış.'

const levianembed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.addField('» Bellek Kullanımı', `${(process.memoryUsage().heapUsed /1024 / 1024).toFixed(2)} mb`)
.addField('» Sunucu Sayısı', client.guilds.cache.size.toLocaleString())
.addField('» Kullanıcı Sayısı', client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString())
.addField('» Shard', `0`)
.addField('» Toplam Sistemdeki Bot', `${toplambot}`)
.addField('» Toplam Açık Sistem', `${toplamaciksistem}`)
.addField('» Kuralları Kabul Eden Üye Sayısı', `${kuralkabul}`)
message.channel.send(levianembed)
};
//emojileri bir zahmet siz yapın :)
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik','i'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  desciption: 'WenSamita Neiva',
  usage: 'Bayrak & WenSamita Neiva'
};