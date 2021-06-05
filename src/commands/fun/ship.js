module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'ship',
				categoria: '😄 • Diversão',
				desc: 'Veja se um casal dá certo'
			},
			en: {
				nome: 'ship',
				categoria: '😄 • Fun',
				desc: 'See if a couple works'
			},
			aliases: ['shippar', 'friendship'],
			run: this.run
		};
	}
	async run(ctx) {
        if(!ctx.args[0]) return ctx.addMessageReaction("❌")
        let porcentagem
        
        const user1 = ctx.message.author
        const user2 = ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0])

        if(!user2) return ctx.addMessageReaction("❌")

        const ship1 = await db.get(`ship-${user1.id}-${user2.id}`)
        const ship2 = await db.get(`ship-${user1.id}-${user2.id}`)

        const nome = user1.username.slice(0,3) + user2.username.slice(0,3)

        if(!ship1 && !ship2) {
            porcentagem = Math.floor(Math.random()*101)
        } else {
            porcentagem = ship1
        }

        if(user1.id == user2.id) {
            porcentagem = 50
        }
        let description;
        let emoji;

        if(porcentagem <= 23){
            description = `> **${porcentagem}%** \`${nome.replace(/`/g, '')}\` vocês 2 deles não são compatíveis, são muito diferentes um do outro. 😔`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f645-2640.png'
        }

        if(porcentagem > 23 && porcentagem <= 47){
            description = `> **${porcentagem}%** \`${nome.replace(/`/g, '')}\` vocês podem ser amigos, mas não vejo um futuro melhor entre eles, eles vocês são parecidos um com o outro. 🤝`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f91d.png'
        }

        if(porcentagem > 47 && porcentagem <= 80){
            description = `> **${porcentagem}%** \`${nome.replace(/`/g, '')}\` vocês podem ser um casal, os gostos são quase os mesmos, vocês se conhecem muito. 👀`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f440.png'
        }

        if(porcentagem > 80){
            description = `> **${porcentagem}%** \`${nome.replace(/`/g, '')}\` são perfeitos, feitos um para o outro, vai em frente, vocês tem tudo para dar certo! ❤️`
            emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/2764.png'
        }
        
        ctx.message.channel.createMessage(`💖 ${ctx.message.author.mention}\n${description}`).then(async msg => {
            if(!ship1 && !ship2) {
                await db.set(`ship-${user1.id}-${user2.id}`, porcentagem)
                await db.set(`ship-${user2.id}-${user1.id}`, porcentagem)
            } else {
                return;
            }
        })
    }
};

//ADG, Davi e LRD