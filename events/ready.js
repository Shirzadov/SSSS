const chalk = require('chalk');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');



module.exports = client => {

var oyun = [
        `${ayarlar.prefix}botlist | ${ayarlar.prefix}botlist-mesaj | ${ayarlar.prefix}yardım`,
        `10 Dakikada BotList Sunucusu Kur`
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "" );
        }, 2 * 4000 );
  
  client.user.setStatus("online");
}; 