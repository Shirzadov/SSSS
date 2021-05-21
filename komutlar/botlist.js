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


  let levian = args[0];
 // let coinsayi = db.fetch(`coin_${message.author.id}`)
  if(!levian) {
       const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayColor)
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Hata! Lütfen Argüman Belirtin.**\n\n**Argümanlar**\n\`( sorumlusu | developer rol | bot rol | ekle kanal | log kanal | yetkili kanal | yetkili log | aç | kapat )\``)

      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
    return message.channel.send(embed);
  
  }
  if (levian == `sorumlusu`) {
    let rol =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!rol) return embed(`${emojiler.olumsuz} | Lütfen bir rol etiketleyin.`);
    db.set(`modrole_${message.guild.id}.`, rol.id);
    return embed(`${emojiler.onay} | Botlist sorumlusu rolü \`${rol.name}\` olarak ayarlandı.`);
} else if (levian == `developer`) {
    let arg = args[1]
    if(arg == `rol`) {
      let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!rol) return embed(`${emojiler.olumsuz} | Lütfen bir rol etiketleyin.`);
    db.set(`developer_${message.guild.id}.`, rol.id);
    return embed(`${emojiler.onay} | Botlist developer rolü \`${rol.name}\` olarak ayarlandı.`);
} }else if (levian == `bot`) {
    let arg = args[1]
    if(arg == `rol`) {
      let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    if (!rol) return embed(`${emojiler.olumsuz} | Lütfen bir rol etiketleyin.`);
    db.set(`botrol_${message.guild.id}.`, rol.id);
    return embed(`${emojiler.onay} | Botlist bot rolü \`${rol.name}\` olarak ayarlandı.`);
}
//-------------------------------------------------------------------------------------------------------
  } else if (levian == `aç`) {
 if(db.fetch(`botlist_${message.guild.id}`))return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Zaten Açık.**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
 let sorumlusu = db.fetch(`modrole_${message.guild.id}`)
   if(!sorumlusu) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let eklekanal = db.fetch(`eklekanal_${message.guild.id}`)
   if(!eklekanal) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let logkanal = db.fetch(`logkanal_${message.guild.id}`)
   if(!logkanal) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let yetkilikanal = db.fetch(`yetkili_kanal_${message.guild.id}`)
   if(!yetkilikanal) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let developerrol = db.fetch(`developer_${message.guild.id}`)
   if(!developerrol) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let botrol = db.fetch(`botrol_${message.guild.id}`)
   if(!botrol) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let yetkililog = db.fetch(`yetkililog_${message.guild.id}`)
   if(!yetkililog) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------
let banlog = db.fetch(`banlog_${message.guild.id}`)
   if(!banlog) return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Sunucuda Sistem Ayarlanmamış ${ayarlar.prefix}botlist (argüman) @rol / kanal**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//-------------------------------------------------------------------------------------------------------

    db.set(`botlist_${message.guild.id}`, true);
    db.add(`aciksistem.`, 1)
    return embed(`${emojiler.onay} | Botlist sistemi başarıyla aktif hale getirildi.`);
  
  } else if (levian == `kapat`) {
     if(!db.fetch(`botlist_${message.guild.id}`)) return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Zaten Kapalı.**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
    db.delete(`botlist_${message.guild.id}`);
    db.substr(`aciksistem.`, 1)
    return embed(`${emojiler.onay} | Botlist sistemi başarıyla deaktif hale getirildi.`);
  }
   else if (levian == `sıfırla`) {
     if(!db.fetch(`modrole_${message.guild.id}`)) return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`botlist_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`eklekanal_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`logkanal_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`yetkili_kanal_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`developer_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`botrol_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`yetkililog_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
     if(!db.fetch(`banlog_${message.guild.id}`)) return message.channel.send(
            new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`${emojiler.olumsuz} **| Botlist Sistemi Daha Önce Tam Ayarlanmamış Veya Hiç Ayarlanmamış**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
    db.delete(`modrole_${message.guild.id}`);
    db.delete(`botlist_${message.guild.id}`)
    db.delete(`eklekanal_${message.guild.id}`)
    db.delete(`logkanal_${message.guild.id}`)
    db.delete(`yetkili_kanal_${message.guild.id}`)
    db.delete(`developer_${message.guild.id}`)
    db.delete(`botrol_${message.guild.id}`)
    db.delete(`yetkililog_${message.guild.id}`)
    return embed(`${emojiler.onay} | Botlist sistemi başarıyla sıfırlandı.`);


  }  else if (levian == `ekle`) {
    let arg = args[1]
    if(arg == `kanal`) {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return embed(`${emojiler.olumsuz} | Lütfen bir kanal etiketleyin.`)
      db.set(`eklekanal_${message.guild.id}`, channel)
      return embed(`**${emojiler.onay} | Botlist ekle kanalı <#${channel.id}> olarak ayarlandı.**`);
      }
    } else if (levian == `ban`) {
    let arg = args[1]
    if(arg == `log`) {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return embed(`${emojiler.olumsuz} | Lütfen bir kanal etiketleyin.`)
      db.set(`banlog_${message.guild.id}`, channel)
      return embed(`**${emojiler.onay} | Botlist ekle kanalı <#${channel.id}> olarak ayarlandı.**`);
      } 
  } else if (levian == `log`) {
      let arg = args[1]
      if(arg == `kanal`) {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return embed(`${emojiler.olumsuz} | Lütfen bir kanal etiketleyin.`)
    db.set(`logkanal_${message.guild.id}`, channel)
    return embed(`**${emojiler.onay} | Botlist log kanalı başarıyla <#${channel.id}> olarak ayarlandı.**`);
  } 
 } else if (levian == `yetkili`) {
    let arg = args[1]
    if(arg == `kanal`) {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return embed(`${emojiler.olumsuz} | Lütfen bir kanal etiketleyin.`)
      db.set(`yetkili_kanal_${message.guild.id}`, channel)
      return embed(`**${emojiler.onay} | Botlist yetkili kanalı <#${channel.id}> olarak ayarlandı.**`);
} else if (levian == `yetkili`) {
    let arg = args[1]
    if(arg == `log`) {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
      if(!channel) return embed(`${emojiler.olumsuz} | Lütfen bir kanal etiketleyin.`)
      db.set(`yetkililog_${message.guild.id}`, channel)
      return embed(`**${emojiler.onay} | Botlist yetkili log kanalı <#${channel.id}> olarak ayarlandı.**`);
}
}
 /* }/* else if (levian == `şart`) {
        let arg = args[1]
    if(arg == `ayarla`) {
      let üye = args[2]
      if(message.guild.memberCount > üye) return embed(`${emojiler.olumsuz} | Üzgünüm, maximum sunucunuzda anan üye sayısı, yani \`${message.guild.memberCount}\` yapabilirsiniz.`)
      db.set(`Botlistşart_ayarla.${message.guild.id}`, üye)
      return embed(`**${emojiler.onay} | Artık sunucusundaki üye sayısı \`${üye}\`'dan büyük olmayan sunucular sunucuya Botlistlik isteği atamayacak.**`);
      }
      if(arg == `sıfırla`) {
      db.delete(`Botlistşart_ayarla.${message.guild.id}`)
      return embed(`**${emojiler.onay} | Botlist şart başarıyla sıfırlandı.**`);
      }
   } else if (levian == `vip`) {
  return embed(`${emojiler.olumsuz} | Sunucunuza premium alabilmek için 150 Coine ihtiyacınız var. Bilgi almak için [tıkla](https://discord.gg/sBGxGhcFG4).`)
    return embed(`${emojiler.onay} | Botlistlik sistemi başarıyla deaktif hale getirildi.`);//150 coinimiz olmadığı için yapmadık
  } else if (levian == `izin`) {
   if(coinsayi < 75) return embed(`${emojiler.olumsuz} | Sunucunuza 2 davet linki izni almak için 75 Coine ihtiyacınız var. Bilgi almak için [tıkla](https://discord.gg/sBGxGhcFG4).`);*/
  }

  async function embed(text) {
    const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayColor)
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setDescription(`**${text}**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
    let msg = await message.channel.send(embed).then(m => m.delete({timeout: 120000}));
    return msg;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "botlist",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
