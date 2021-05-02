module.exports = class PlayCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'play',
          categoria: '🎵 • Música',
          desc: 'Toca alguma música'
        },
        en: {
          nome: 'play',
          categoria: '🎵 • Music',
          desc: 'Play a song'
        },
      aliases: ['tocar', 'musica', 'start', 'p'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
      //262800000000002623
      const vipschema = require("../../config/database/mongodb/vip");
      const timeout = 262800000000002623

      vipschema.findOne({User:message.author.id}, async (err,data) => {
        if(!data) return message.quote(`:x: ${message.author} **|** ${idioma.donate.vip}`)
        
        if (data.Time !== null && timeout - (Date.now() - data.Time) < 0) return message.quote(`:x: ${message.author} **|** ${idioma.donate.vip}`)
        
        if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.play.nada.replace("%p", prefixoCerto)}`)
        const search = args.join(" ");
        let res;
        try {
            res = await client.manager.search(search, message.author);
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw { message: "[ERROR] Playlists are not supported with this command." };
          } catch (err) {
            return message.quote(`:x: ${message.author} | Error: \`${err.message}\``);
          }
          const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true
          });
          player.connect();
          player.queue.add(res.tracks[0]);
          if (!player.playing && !player.paused && !player.queue.size) player.play()
          const embed = new (require("discord.js")).MessageEmbed()
          .setDescription(`${idioma.play.add} \`${res.tracks[0].title.replace(/`/g, '')}\` | \`${message.author.tag.replace(/`/g, '')}\``)
          .setColor("F47FFF")
          return message.channel.send(embed);
      })

    }
  }
  
  //ADG