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
    constructor(name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes) {
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
        this.pokemons = pokemons;
        this.attributes = attributes;
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getNature() {
        return this.nature;
    }

    get getConfidence() {
        return this.confidence;
    }

    get getPlayer() {
        return this.player;
    }

    get getHP() {
        return this.HP;
    }

    get getWILL() {
        return this.WILL;
    }

    get getMoney() {
        return this.money;
    }

    get getConcept() {
        return this.concept;
    }

    get getXp() {
        return this.xp;
    }

    get getAge() {
        return this.age;
    }

    get getRank() {
        return this.rank;
    }

    get getImage() {
        return this.image;
    }

    get getItens() {
        return this.itens;
    }

    get getBadges() {
        return this.badges;
    }

    get getPokemons() {
        return this.pokemons;
    }

    get getAttributes() {
        return this.attributes;
    }

    // Setters
    set setName(name) {
        this.name = name;
    }

    set setNature(nature) {
        this.nature = nature;
    }

    set setConfidence(confidence) {
        this.confidence = confidence;
    }

    set setPlayer(player) {
        this.player = player;
    }

    set setHP(HP) {
        this.HP = HP;
    }

    set setWILL(WILL) {
        this.WILL = WILL;
    }

    set setMoney(money) {
        this.money = money;
    }

    set setConcept(concept) {
        this.concept = concept;
    }

    set setXp(xp) {
        this.xp = xp;
    }

    set setAge(age) {
        this.age = age;
    }

    set setRank(rank) {
        this.rank = rank;
    }

    set setImage(image) {
        this.image = image;
    }

    set setItens(itens) {
        this.itens = itens;
    }

    set setBadges(badges) {
        this.badges = badges;
    }

    set setPokemons(pokemons) {
        this.pokemons = pokemons;
    }

    set setAttributes(attributes) {
        this.attributes = attributes;
    }
}