const createPollCommand = async (ctx) => {
    await ctx.reply('/')

    const {data, error} = await database
        .from('polls')
        .insert({
            theme: "Кандидат",
            title: "Кандидат",
            description: "Кандидат",
            variants: [1, 2, 3]
        })
        .select()
}

export default createPollCommand;