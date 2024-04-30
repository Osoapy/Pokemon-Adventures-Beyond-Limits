/*

EXPLAINING THE TRAINER CLASS

WE HAVE:

- THE TRAINER'S NAME
- THE TRAINER'S NATURE
- THE TRAINER'S BADGES
- THE TRAINER'S AGE

- THE RESPECTIVE PLAYER
- THE TRAINER'S RANK
- THE RESPECTIVE IMAGE
- THE ACTUAL XP
- THE ACTUAL MONEY

- THE TRAINER'S POKEMONS
- THE TRAINER'S ITENS

- THE TRAINER'S ATTRIBUTES
- THE TRAINER'S HP
- THE TRAINER'S WILL
- THE TRAINER'S CONFIDENCE
- THE TRAINER'S CONCEPT

*/

export class Trainer {
    constructor(name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes, skills) {
        this.name = name;
        this.nature = nature;
        this.confidence = confidence;
        this.player = player;
        this.HP = HP;
        this.WILL = WILL;
        this.money = money;
        this.concept = concept;
        this.xp = xp;
        this.age = age;
        this.rank = rank;
        this.image = image;
        this.itens = itens;
        this.badges = badges;
        this.pokemons = [];
        this.pokemons.push(pokemons);
        this.attributes = attributes;
        this.skills = skills;
    }

    // Getters
    get name() {
        return this._name;
    }

    get nature() {
        return this._nature;
    }

    get confidence() {
        return this._confidence;
    }

    get player() {
        return this._player;
    }

    get HP() {
        return this._HP;
    }

    get WILL() {
        return this._WILL;
    }

    get money() {
        return this._money;
    }

    get concept() {
        return this._concept;
    }

    get xp() {
        return this._xp;
    }

    get age() {
        return this._age;
    }

    get rank() {
        return this._rank;
    }

    get image() {
        return this._image;
    }

    get itens() {
        return this._itens;
    }

    get badges() {
        return this._badges;
    }

    get pokemons() {
        return this._pokemons;
    }

    get attributes() {
        return this._attributes;
    }
  
    get skills() {
        return this._skills;
    }

    // Setters
    set name(name) {
        this._name = name;
    }

    set nature(nature) {
        this._nature = nature;
    }

    set confidence(confidence) {
        this._confidence = confidence;
    }

    set player(player) {
        this._player = player;
    }

    set HP(HP) {
        this._HP = HP;
    }

    set WILL(WILL) {
        this._WILL = WILL;
    }

    set money(money) {
        this._money = money;
    }

    set concept(concept) {
        this._concept = concept;
    }

    set xp(xp) {
        this._xp = xp;
    }

    set age(age) {
        this._age = age;
    }

    set rank(rank) {
        this._rank = rank;
    }

    set image(image) {
        this._image = image;
    }

    set itens(itens) {
        this._itens = itens;
    }

    set badges(badges) {
        this._badges = badges;
    }

    set pokemons(pokemons) {
        this._pokemons = pokemons;
    }

    set attributes(attributes) {
        this._attributes = attributes;
    }

    set skills(skills) {
        this._skills = skills;
    }
}