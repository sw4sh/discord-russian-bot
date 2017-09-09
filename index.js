const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const prefix = ">";

const cheerio = require('cheerio'), 
      snekfetch = require('snekfetch'),
      querystring = require('querystring');




function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function iq(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter:"audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var joke = [
    "What whould happen if the pilgrims had killed cats instead of turkeys?\nWe'd eat pussy every thanksgiving",
    "Q. What doesn't belong in this list : Meat, Eggs, Wife, Blowjob? A. Blowjob: You can beat your meat, eggs or wife, but you can't beat a blowjob.",
    "Q. What do you call a dog with no legs?\n you can call it anything it wont come.",
    "What does a dum call a dumpster.\n Bed and Breakfast",
    "Q: What did the doughnut say to the loaf of bread? A: If I had that much dough, I wouldn't be hanging around this hole.",
    "Q: What do you call cheese that isnt yours?\n A: Nacho cheese",
    "I asked my grandma if she had ever tried 69.\n She said, No, but I have done 53 -- that's all the sailors I could screw in one night.",
    "Why don't witches wear undies?\n To get a better grip on their brooms.",
    "You're so stupid that you had to call 411 to get the number for 911.",
    "A man cheats on his girlfriend Lorraine with a woman named Clearly.\nLorraine dies suddenly.\nAt the funeral, the man stands up and sings, I can see Clearly now, Lorraine is gone.",
    "Q: Why did the forgetful chicken cross the road?\nA: To get to the other side -- er, no -- to go shopping -- no, not that either -- damn it.",
    "Q: Why did the calf cross the road?\nA: To get to the udder side.",
    "Q: Why did the one-handed man cross the road?\nA: To get to the second hand shop.",
    "Q: Why did the monkey cross the road?\nA: So he could get spanked.",
    "What's pink, 6 inches long, and makes my girlfriend cry when I put it in her mouth? Her miscarriage.",
    "What's the difference between a Taliban outpost and a Pakistani elementary school?\nI don't know, I just fly the drone!"
];

var coin = [
    "Орёл",
    "Решка",
    "Мне похуй",
    "И в небо летит монетка с одинаковыми сторонами..."
];

var fortunes = [
    "Да",
    "Нет",
    "Может быть:thinking:",
    "Нахуй иди",
    "Скорее да, чем нет",
    "Скорее нет, чем да",
    "Возможно частично",
    "Бля, хуле ты доебался? Че тебе, блять, надо?"
];

var servers = {};


bot.on('ready', () => {
    console.log('Bot is Ready!');
    
    bot.user.setStatus('dnd');
    bot.user.setGame('>ком - Помощь.', 'https://twitch.tv/sw4sh');    
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + " добро пожаловать в Ад.");

    member.addRole(member.guild.roles.find("name", "ПОП"));
});

bot.on('message', message => {
    if (message.content === 'АНТИХАЙП') {
        message.channel.send('АНТИХАЙП!', {
            tts: true
        });
    }
});

bot.on('message', function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;   

    var args = message.content.substring(prefix.length).split(" ");


    switch (args[0].toLowerCase()) {
        case "ping":
        message.reply("Pong!");
        break;
    case "инфо":
        message.channel.sendMessage("Я величайший **CzechBot**(*Чешский Бот*), созданный пиздатым кодером **СвЧехом**. **Голднил - пидор.**");
        break;
    case "шар":
        if (args[1]) message.reply(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.reply("Нормально напиши, хуле тебе надо, долбаеб.");
        break;
    case "yt":
        var yt = new Discord.RichEmbed()
            .addField("unknown project - YouTube Канал.", "https://vk.cc/73UsHS", true)
            .setColor(0xd60d0d)
            .setFooter("Канал Чеха. Лучший канал. Лучший Чех.")
            .setThumbnail('https://yt3.ggpht.com/-IkswrF3UdTM/AAAAAAAAAAI/AAAAAAAAAAA/5vjdjAuQO0I/s288-c-k-no-mo-rj-c0xffffff/photo.jpg')
        message.channel.sendEmbed(yt);
        break;
    case "vk":
        var vk = new Discord.RichEmbed()
            .addField("EBANII STREAMHUB - Группа ВК.", "https://vk.cc/73UsVf", true)
            .setColor(0x3D85C6)
            .setFooter("Группа со стримами, мемами и прочим - подписывайся!")
            .setThumbnail('https://pp.userapi.com/c836730/v836730912/59b68/N3fvCNf9jAc.jpg')
        message.channel.sendEmbed(vk);
        break;
    case "tw":
        var tw = new Discord.RichEmbed()
            .setColor(0x674EA7) 
            .setThumbnail('https://vignette4.wikia.nocookie.net/sims/images/6/65/Twitch_logo.png/revision/latest?cb=20140719225727')    
            .addField("Reflexs228 - Пемолюкс.", "https://vk.cc/73UVhR")
            .addField("|E|Bok - Вантуз.", "https://vk.cc/73UYEL")
            .addField("GoldNil - подсос Ледяной.", "https://vk.cc/73UWME")
            .setFooter("Можешь и не подписываться. Все равно эти долбоебы не стримят.")
        message.channel.sendEmbed(tw);
        break;
    case "ком":
        var cmds = new Discord.RichEmbed()
        .setColor(generateHex())
        .addField("Команды Бота:","*>инфо - о Боте.\n\n>yt - YouTube-канал.\n\n>vk - Группа ВК.\n\n>tw - Twitch-каналы.\n\n>чисти [кол-во] - Отчистить указзаное кол-во сообщений.\n\n\n>рофлменю - Меню лучших Рофлов Бота.\n>музменю - Музыкальное меню Бота.*")
        .setFooter("Разработчик - СвЧех")
        .setDescription("Бот находится в ранней разработке.")
        message.channel.sendEmbed(cmds);
        break;
    case "монетка":
        message.reply(coin[Math.floor(Math.random() * coin.length)]);
        break;
    case "играй":
        if (!args[1]) {
            message.channel.sendMessage("Закинь ссылку, блять, не тупи, ты меня **раздражаешь!**");
            console.log("[" + new Date().toLocaleString() + "] Ошибка воспроизведения #1")
            return;
        }

        if (!message.member.voiceChannel) {
            message.channel.sendMessage("Блять, нахуй мне играть, если **ты не в Voice-чате? Ты, блять, тупой?**");
            console.log("[" + new Date().toLocaleString() + "] Ошибка воспроизведения #2")
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
            console.log("[" + new Date().toLocaleString() + "] Воспроизведение.");
        })
        break;
    case "скип":
        var server = servers[message.guild.id];

        if (server.dispatcher) server.dispatcher.end();
        break;
    case "прекрати":
        var server = servers[message.guild.id];

        if (message.guild.voiceConnection)
            {
                for (var i = server.queue.length - 1; i >= 0; i--) 
                {
                    server.queue.splice(i, 1);
             }
                server.dispatcher.end();
                message.channel.sendMessage("Я прекратил этот **марафон говна**. Не благодарите.")
                console.log("[" + new Date().toLocaleString() + "] Остановка воспроизведения.");
            }
        break;
    case "рофлменю":
        var roflcmds = new Discord.RichEmbed()
            .setColor(generateHex())
            .setThumbnail("https://thumbs.dreamstime.com/t/rire-avec-des-larmes-et-pointage-de-l-%C3%A9motic-ne-85083127.jpg")
            .addField("Рофлян Меню Бота:","*>ping - Пинг-Понг.\n\n>шар - Шар-Восьмёрка.\n\n>монетка - Подбрось монетку.\n\n>iq - Твой IQ.\n\n>пикча - рандомная пикча.\n\n>обои - случайные обои в FullHD.\n\n>кот - случайный кот.\n\n>догги - рандомный пёсель.\n\n>joke - English Humor.\n\n>урод - показывает самого уродливого человека на сервере.*")
            .setFooter("Разработчик - СвЧех")
            .setDescription("Бот находится в ранней разработке.")
        message.channel.sendEmbed(roflcmds);  
        break;
    case "музменю":
        var msccmds = new Discord.RichEmbed()
            .setColor(generateHex())
            .setThumbnail("https://pp.userapi.com/c840634/v840634087/24ae/LU0uh0jCY3A.jpg")
            .addField("Музыкальное Меню Бота:","*>играй [ссылка на ролик YouTube] - Проигрывание роликов YouTube.\n\n>скип - Пропустить текущий ролик.\n\n>прекрати - Остановить проигрывание.*")
            .setFooter("Разработчик - СвЧех")
            .setDescription("Бот находится в ранней разработке.")
        message.channel.sendEmbed(msccmds);  
        break;
    case "iq":
        message.reply("Твой IQ: " + iq(1, 200));
        break;
    case "joke":
        message.reply(joke[Math.floor(Math.random() * joke.length)] + "\n\n**English** (~~Английский~~) **Humor** :thinking:");
        break;
    case "пикча":
        message.channel.sendMessage('_**Рандомная пикча:**_');
        message.channel.sendFile('http://lorempixel.com/640/480/', 'random_pic.jpg', 'Рандомная Пикча.');
        break;
    case "обои":
        message.channel.sendMessage('_**Рандомные обои FullHD:**_');
        message.channel.sendFile('https://unsplash.it/1920/1080?random', 'random_bg_fullhd.jpg', 'Рандомные Обои ФулХД.'); 
        break;
    case "кот":
        message.channel.sendMessage('_**Рандомный кот:**_');
        message.channel.sendFile('http://loremflickr.com/640/480/cat', 'random_cat.jpg', 'Рандомный кот.');
        message.channel.sendMessage('*Ебать, прям посмотри на него :3*');
        break;
    case "догги":
        message.channel.sendMessage('_**Зацени пса:**_');
        message.channel.sendMessage('*Пёсель.*');
        message.channel.sendFile('http://loremflickr.com/1280/720/dog', 'random_cosplay.jpg','Рандомный Косплей.');
        break;
    case "аниме":
        var anime = new Discord.RichEmbed()
            .setColor(generateHex())
            .setThumbnail("https://s-media-cache-ak0.pinimg.com/originals/0a/12/39/0a123943ebc6b7e5049d7ed8e0110eea.png")
            .addField("Альфа-панель для анимешников.","*Нихуя нет.*")
            .setFooter("Разработчик - СвЧех")
            .setDescription("Бот находится в ранней разработке.")
        message.channel.sendEmbed(anime);
        break;
    /*case "аммемы":
        var imgz = reload;
        var folder = "resources/cmdimgs/anime"; 
        var rand = Math.floor(Math.random() * imgz.length);
        message.channel.sendFile(folder + imgz[rand], imgz[rand]);
        break;*/
    case "урод":
        var ugly = new Discord.RichEmbed()
            .setColor(generateHex())
            .setImage(message.author.avatarURL)
            .addField("Это реальный урод:","*Ой, бля, да это же ты, "+ message.author.username+ " :thinking:*")
            .setFooter("Разработчик - СвЧех")
        message.channel.sendEmbed(ugly);
        break;
    case "чисти":
        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
            if (!amount) return message.reply('Блять, введи сколько тебе надо сообщений удалить, **сука, не беси!**');
            if (!amount && !user) return message.reply('**Да ебана,** ты либо введи от какого долбаеба и сколько удалить сообщения, либо просто сколько вообще удалить сообщений.');
                message.channel.fetchMessages({
                limit: amount,
                }).then((messages) => {
                if (user) {
            const filterBy = user ? user.id : Client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
        break;
   /* case "ищи":
              async function googleCommand(msg, args) {

                   let searchMessage = await message.reply('Searching... Sec.');
                   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(msg.content)}`;

                   return snekfetch.get(searchUrl).then((result) => {
                
                      let $ = cheerio.load(result.text);
                
                      let googleData = $('.r').first().find('a').first().attr('href');
                
                      googleData = querystring.parse(googleData.replace('/url?', ''));
                      searchMessage.edit(`Result found!\n${googleData.q}`);
                
                  }).catch((err) => {
                     searchMessage.edit('No results found!');
                  });
                }*/
    default:
     ("Неизвестная команда.");
    }    
});

bot.login('MzUyNzg4MzY5MTY1Nzc4OTQ1.DIsQFA.orAAdgB9nUj_eUFo8weXQhKuBcc');