module.exports = class NpmCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'npm',
        categoria: '🕰️ • Utilidades',
        desc: 'Procura um package no npm'
      },
      en: {
        nome: 'npm',
        categoria: '🕰️ • Utility',
        desc: 'Search a package in npm'
      },
      aliases: ['node', 'npmjs', 'package'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`❌ ${ctx.message.author.mention} **|** ${ctx.idioma.mal.term}`)
    const fetch = require('star-fetch')
    const res = fetch(`https://api.tovade.xyz/v1/info/npm?package=${encodeURIComponent(ctx.args.join(' '))}`)
    const embed = new global.star.manager.Ebl()
    embed.title(`<:st_npm:867798249371992084> ${ctx.args.join(' ').toLowerCase()} [ v${res.version} ]`)
    embed.description(res.description)
    embed.field(`📚 ${ctx.idioma.npm.licença}`, res.license)
    embed.field(`👑 ${ctx.idioma.npm.dono}`, res.author)
    embed.field(`🙋 ${ctx.idioma.npm.contri}`, res.maintainers)
    embed.field('<:st_github:850386245887852545> Source', res.repository)
    embed.thumbnail(global.star.user.avatarURL)
    embed.color('#dd3af0')
    ctx.send(embed.create)
  }
}
