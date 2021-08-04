module.exports = class DailyCommand {
  constructor () {
    return {
      permissoes: {
        membro: [],
        bot: ['embedLinks'],
        dono: false
      },
      pt: {
        nome: 'dep',
        categoria: '💸 • Economia',
        desc: 'Pega seu bonûs diário'
      },
      en: {
        nome: 'dep',
        categoria: '💸 • Economy',
        desc: 'Take you daily bonûs'
      },
      aliases: ['depositar', 'deposit'],
      run: this.run
    }
  }

  async run (ctx) {
    if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.inv}`)

    const money = await global.db.get(`money-${ctx.message.author.id}`) || Number(0)
    const banco = await global.db.get(`banco-${ctx.message.author.id}`) || Number(0)

    if (Number(money) === Number(0) || Number(money) < Number(0)) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.nomoney}`)

    if (ctx.args[0] === 'all' || ctx.args[0] === 'tudo') {
      await global.db.set(`banco-${ctx.message.author.id}`, Number(banco) + Number(money))
      await global.db.set(`money-${ctx.message.author.id}`, Number(money) - Number(money))
      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.dp1} **¥ ${money.toLocaleString()}** ${ctx.idioma.economy.dep.dp2}`)
    } else {
      if (isNaN(ctx.args[0])) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.inv}`)

      if (Number(ctx.args[0]) < Number(0) || Number(ctx.args[0]) > Number(money)) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.nomoney}`)

      await global.db.set(`banco-${ctx.message.author.id}`, Number(banco) + Number(ctx.args[0]))
      await global.db.set(`money-${ctx.message.author.id}`, Number(money) - Number(ctx.args[0]))

      ctx.send(`:white_check_mark: ${ctx.message.author.mention} **|** ${ctx.idioma.economy.dep.dp1} **¥ ${ctx.args[0].toLocaleString()}** ${ctx.idioma.economy.dep.dp2}`)
    }
  }
}
