module.exports = class AnimeCommand {
  constructor() {
      return {
          permissoes: {
              membro: [],
              bot: ['embedLinks'],
              dono: false
          },
          pt: {
              nome: 'anime',
              categoria: '📘 • Anime',
              desc: 'Para pesquisar anime no MAL'
          },
          en: {
              nome: 'anime',
              categoria: '📘 • Anime',
              desc: 'To search anime on MAL'
          },
          aliases: ['manime', 'malanime'],
          run: this.run
      }
  }
  async run(ctx) {
      if (!ctx.args[0]) return ctx.addMessageReaction("❌")
      const fetch = require("star-fetch")
      const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${ctx.args.join(" ").replace(/ /g, '%20')}`)
      let anime = res.results[0]
          if (anime.rated == 'Rx' && !ctx.message.channel.nsfw) {
              anime = res.results[1]
          }
              let embed = new star.manager.ebl;
              embed.title(`📚 Anime | ${anime.title}`)
              embed.url(anime.url)
              embed.description(anime.synopsis)
              embed.field(`📺 Episodes:`, `\`${anime.episodes}\``)
              embed.field(`⭐ Score:`, `\`${anime.score}\``)
              embed.field(`💻 Mal ID:`, `\`${anime.mal_id} [${anime.url}]\``)
              embed.thumbnail(anime.image_url)
              embed.color('#dd3af0')
              ctx.message.channel.createMessage(embed.create)
  }
}
// ADG