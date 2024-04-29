/*

EXPLAINING THE POKEMON CLASS

WE HAVE:

- THE SPECIES NAME
- THE GIVEN NICKNAME
- THE SPECIES TYPES
- THE SPECIES HEIGHT
- THE SPECIES WEIGHT

- ITS HELD ITEM
- THE ACTUAL STATS

- THE GIVEN HABILITY
- THE GIVEN NATURE
- THE ACTUAL STATS
- THE ACTUAL EXP
- THE ACTUAL EV'S
- THE GIVEN IV'S

- ITS FRIENDSHIP LEVEL
- ITS HAPINESS

- THE CHOSEN MOVESET

- IF IT IS SHINY

- ITS CRIES

*/

export class Pokemon {
    constructor(name, nickname, level, attributes, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries) {
        this.name = name;
        this.nickname = nickname;
        this.level = level;
        this.attributes = attributes;
        this.nature = nature;
        this.ivs = ivs;
        this.evs = evs;
        this.item = item;
        this.moves = moves;
        this.types = types;
        this.weight = weight;
        this.height = height;
        this.hapiness = hapiness;
        this.friendship = friendship;
        this.isShiny = isShiny;
        this.cries = cries;
    }

    // Getters
    get getName() {
        return this.name;
    }

    get getNickname() {
        return this.nickname;
    }

    get getLevel() {
        return this.level;
    }

    get getAttributes() {
        return this.attributes;
    }

    get getNature() {
        return this.nature;
    }

    get getIvs() {
        return this.ivs;
    }

    get getEvs() {
        return this.evs;
    }

    get getItem() {
        return this.item;
    }

    get getMoves() {
        return this.moves;
    }

    get getTypes() {
        return this.types;
    }

    get getWeight() {
        return this.weight;
    }

    get getHeight() {
        return this.height;
    }

    get getHapiness() {
        return this.hapiness;
    }

    get getFriendship() {
        return this.friendship;
    }

    get getIsShiny() {
        return this.isShiny;
    }

    get getCries() {
        return this.cries;
    }

    // Setters
    set setName(name) {
        this.name = name;
    }

    set setNickname(nickname) {
        this.nickname = nickname;
    }

    set setLevel(level) {
        this.level = level;
    }

    set setAttributes(attributes) {
        this.attributes = attributes;
    }

    set setNature(nature) {
        this.nature = nature;
    }

    set setIvs(ivs) {
        this.ivs = ivs;
    }

    set setEvs(evs) {
        this.evs = evs;
    }

    set setItem(item) {
        this.item = item;
    }

    set setMoves(moves) {
        this.moves = moves;
    }

    set setTypes(types) {
        this.types = types;
    }

    set setWeight(weight) {
        this.weight = weight;
    }

    set setHeight(height) {
        this.height = height;
    }

    set setHapiness(hapiness) {
        this.hapiness = hapiness;
    }

    set setFriendship(friendship) {
        this.friendship = friendship;
    }

    set setIsShiny(isShiny) {
        this.isShiny = isShiny;
    }

    set setCries(cries) {
        this.cries = cries;
    }
}