
const pokeApi = {};

pokeApi.getPokemonDetail = async (pokemon, model) => {

    if (model == "list") {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    }
    else if (model == "stats"){
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToStatsModel)
    }
}

pokeApi.getPokemons = (offset = 0, limit = 5, model = "list") => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon, model)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToStatsModel(pokeDetail){
    const pokeStats = pokeDetail.stats
    const stats = new PokeStats();
    stats.name = pokeDetail.name
    stats.photo = pokeDetail.sprites.other.dream_world.front_default

    stats.hp = pokeStats[0].base_stat;
    stats.attack = pokeStats[1].base_stat;
    stats.defense = pokeStats[2].base_stat;
    stats.specialAttack = pokeStats[3].base_stat;
    stats.specialDefense = pokeStats[4].base_stat;
    stats.speed = pokeStats[5].base_stat;
    stats.total = stats.getTotal();
    
    return stats;
}

