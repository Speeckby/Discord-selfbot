module.exports = async (client, e) => {

    let mudae_pokemon = 1707069600000
    while (mudae_pokemon < Date.now()) {
        mudae_pokemon += 7200
    }

    return [true, "Pokémon mudae", "$p", mudae_pokemon, "1099737720026300576", 7200000]
}