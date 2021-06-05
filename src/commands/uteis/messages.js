module.exports = class PingCommand {
	constructor() {
		return {
			permissoes: {
				membro: [], //Permissoes que o usuario necessita
				bot: [], //Permissoes que o bot necessita
				dono: false //Se apenas nos devs podem usar o comando
			},
			pt: {
				nome: 'messages',
				categoria: '🕰️ • Utilidades',
				desc: 'Veja as mensagens de algum usuário'
			},
			en: {
				nome: 'messages',
				categoria: '🕰️ • Utility',
				desc: 'See a user messages'
			},
			aliases: ['msg', 'msgs', 'mensagens'],
			run: this.run
		};
	}
	async run(ctx) {
    const user = ctx.args[0] ? ctx.message.mentions[0] || await star.getRESTUser(ctx.args[0]) : ctx.message.author;
    let valor;
    const mensagens = await db.get(`messages-${ctx.message.guildID}-${user.id}`)
    if(mensagens) {
    valor = mensagens
    } else {
    valor = 0
    }
            const embed = new star.manager.ebl;
            embed.title('💬 Messages')
            embed.color('#dd3af0')
            embed.description(`**${user.username}** tem **${valor} mensagens**`)
            ctx.message.channel.createMessage(embed.create);
    }
};

//ADG, Davi e LRD