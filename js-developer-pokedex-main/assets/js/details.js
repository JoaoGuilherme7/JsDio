const $ = seletor => document.querySelector(seletor);

function addGlobalEventListener(event, seletor, callback) {
    document.addEventListener(event, (e) => {
        if (e.target.matches(seletor))
            callback(e)
    })
}

addGlobalEventListener("click", "li.pokemon", openDetails)
addGlobalEventListener("click", "li.pokemon *", openDetails)
$('#closeDetailsBtn').addEventListener("click", closeDetails)

async function openDetails(e) {

    let pokeNum = getPokeNum(e.target);
    const pokemonStats = (await pokeApi.getPokemons(pokeNum - 1, 1, "stats"))[0];

    document.querySelector('.details').style.display = 'flex';
    completeStats(pokemonStats);
}

function closeDetails() {
    $('.details').style.display = "none";
}

function getPokeNum(elemento) {
    for (let i = 0; i <= 3; i++) {
        if (elemento.hasAttribute("data-pokeNum"))
            return elemento.getAttribute("data-pokeNum");
        elemento = elemento.parentElement;
        if (!elemento) break;
    }
    return null;
}

function completeStats(pokeStats) {
    $('#name').innerText = pokeStats.name;
    $('#hp .value').innerText = pokeStats.hp;

    $('#attack .value').innerText = pokeStats.attack;
    $('#defense .value').innerText = pokeStats.defense;
    $('#specialAttack .value').innerText = pokeStats.specialAttack;
    $('#specialDefense .value').innerText = pokeStats.specialDefense;
    $('#speed .value').innerText = pokeStats.speed;
    $('#total .value').innerText = pokeStats.total;
    $('#pokeImg').setAttribute('src', pokeStats.photo);
    $('#pokeImg').setAttribute('alt', pokeStats.name);

    changeBackgrounds(pokeStats)
}

function changeBackgrounds(pokeStats) {

    let keys = Object.keys(pokeStats);
    for (let i = 0; i < keys.length; i++) {
        if(!['name', 'photo'].includes(keys[i])){
            let percents = percentage(pokeStats[keys[i]], maxValues[keys[i]])
            $(`#${keys[i]}`).style.backgroundImage = `linear-gradient(to right, ${colors[keys[i]]} ${percents}%, #ccc ${percents}%)`
        }
    }
}

function percentage(part, whole) {
    return Math.round((part / whole) * 100);
}

const maxValues = {
    hp: 255,           // Blissey
    attack: 181,       // Kartana
    defense: 230,      // Shuckle
    specialAttack: 180, // Deoxys-Attack
    specialDefense: 230, // Shuckle
    speed: 180,         // Deoxys-Speed
    total: 1125         //Eternatus (Eternamax)
};

const colors = {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    specialAttack: '#9DB7F5',
    specialDefense: '#A7DB8D',
    speed: '#FA92B2',
    total: 'pink'
}