const Discord = require("discord.js");
const { JsonDatabase } = require(`wio.db`);
const db = new JsonDatabase(`Database`);
const emojiler = require(`../emojiler.json`)
const ayarlar = require(`../ayarlar.json`)

exports.run = (client, message, args) => {
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
  let modrole = db.fetch(`modrole_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let eklekanal = db.fetch(`eklekanal_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let logkanal = db.fetch(`logkanal_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let developer = db.fetch(`developer_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let botrol = db.fetch(`botrol_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)
  let yetkililog = db.fetch(`yetkililog_${message.guild.id}` || `Kullanıcıyı Bulamıyorum.`)


    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('Sadece herhangi bir sunucudan mesaj gönderebilirim.:relaxed: ')
    return message.author.sendEmbed(ozelmesajuyari); }




  const sayfa = [`**${message.guild.name} | Ayarları**
\n**Botlist Sorumlusu:** ${db.fetch(`modrole_${message.guild.id}`) ? `Ayarlanmış ` : ` Ayarlanmamış ` }
\n**Developer Rolü:** ${db.fetch(`developer_${message.guild.id}`) ? `Ayarlanmış ` : ` Ayarlanmamış ` }
\n**Büyük harf engeli:** ${db.fetch(`capsEngel_${message.guild.id}`) ? `Açık ` : ` Ayarlanmamış ` }
\n**Otorol:** ${db.fetch(`autoRole_${message.guild.id}`) ? ` \`@${message.guild.roles.get(db.fetch(`autoRole_${message.guild.id}`)).name}\`` : ` Ayarlanmamış `}
\n**Otorol Kayıt Kanalı:** ${db.fetch(`otorolKanal_${message.guild.id}`) ? ` \`${message.guild.channels.get(db.fetch(`otorolKanal_${message.guild.id}`)).name}\` ` : ` Ayarlanmamış `}
\n**Sayaç kanalı:** ${db.fetch(`sayacKanal_${message.guild.id}`) ? ` \`${message.guild.channels.get(db.fetch(`sayacKanal_${message.guild.id}`)).name}\` `: ` Ayarlanmamış  `}
\n**Sayaç:** ${db.fetch(`sayacSayi_${message.guild.id}`) ?` \`${db.fetch(`sayacSayi_${message.guild.id}`)}\` ` : `Ayarlanmamış `}
\n**Giriş Çıkış kanalı:** ${db.fetch(`hgKanal_${message.guild.id}`) ? ` ${client.channels.get(db.fetch(`hgKanal_${message.guild.id}`))} `  : `Ayarlanmamış `}

  
`] 
  
  const ayarReis = new Discord.MessageEmbed()
  .setColor(0x36393E)
  .setDescription(sayfa)
  .setTimestamp()
  
  message.channel.send(ayarReis)

 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["settings",'sunucu-ayarları','sunucuayarları','sunucuayarı'],
    permLevel: 0,
    kategori: "sunucu",
  };
  
  exports.help = {
    name: 'ayarlar',
    description: 'Sunucu ayarlarını gösterir.',
    usage: 'ayarlar',
  };  