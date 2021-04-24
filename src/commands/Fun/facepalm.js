module.exports = class VarporwaveCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'gay',
          categoria: '🤣 • Fun',
          desc: 'Sabe quando seu amigo faz uma besteira? Crie um facepalm dele'
        },
        en: {
          nome: 'gay',
          categoria: '🤣 • Fun',
          desc: 'Do you know when your friend makes a mistake? Create a facepalm of it'
        },
      aliases: ['lgbt'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
      
      const DIG = require("discord-image-generation");
  
      const user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
  
      const av = user.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 })
  
      message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async msg => {
        message.channel.startTyping()
      const img = await new DIG.Facepalm().getImage(av)
          
      const attachment = new (require('discord.js')).MessageAttachment(img, `gay-${user.id}.png`);
  
        message.quote(message.author,attachment).then(message => {
          message.channel.stopTyping()
          msg.delete()
        })
        
      })
  
    }
  }
  
  //ADG