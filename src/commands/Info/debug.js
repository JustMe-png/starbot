module.exports = class EvalCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: [],
        dono: false
      },
      pt: {
        nome: 'debug',
        categoria: '📖 • Informação',
        desc: 'Mostar informações de uma forma direta'
      },
      en: {
        nome: 'debug',
        categoria: '📖 • Informação',
        desc: 'Show information in a direct way'
      },
      aliases: ['deb', 'de'],
      run: this.run
    }
  }

  async run (ctx) {
    const {
      cpuUsage
    } = require('os-utils')
    const data = await global.db.all()
    const cmds = await global.db.get('comandos')
    await cpuUsage(function (v) {
      ctx.send(`> :white_check_mark: ${ctx.message.author.mention} **|** Minhas Informações:\n\n<:st_db:845647017219850300>  ›  **Database:** \`${data.length} arquivos\`;\n<:st_host:830841046153691197>  ›  **Consumo:** \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB | ${v.toFixed(2)}% CPU\`;\n<:st_terminal:845647948335284235>  ›  **Comandos Executados:** \`${cmds} comandos\`;\n<:st_util_info:835532528617259068>  ›  **Servidores:** \`${global.star.guilds.size} servidores\`.`)
    })
  }
}

// BONEE :) - LRD DIZ: Por isso fico uma merda.
