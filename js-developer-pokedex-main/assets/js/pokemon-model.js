class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokeStats {
    name;
    hp;
    attack;
    defense;
    specialAttack;
    specialDefense;
    speed;
    total;

    getTotal(){
        return this.hp + this.attack + this.defense + this.specialAttack + this.specialDefense + this.specialDefense ;
    }
}
