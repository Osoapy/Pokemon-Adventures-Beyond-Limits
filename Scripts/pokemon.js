/*

EXPLAINING THE POKEMON CLASS

WE HAVE:

- THE SPECIES NAME
- THE SPECIES GENDER
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
    constructor(name, gender, nickname, level, attributes, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries) {
        this.name = name;
        this.gender = gender;
        this.nickname = nickname;
        this.ability = ability;
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

    get getGender() {
        return this.gender;
    }

    get getAbility() {
        return this.ability;
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
        this._name = name;
    }

    set setGender(gender) {
        this._gender = gender;
    }

    set setNickname(nickname) {
        this._nickname = nickname;
    }

    set setAbility(ability) {
        this._ability = ability;
    }

    set setLevel(level) {
        this._level = level;
    }

    set setAttributes(attributes) {
        this._attributes = attributes;
    }

    set setNature(nature) {
        this._nature = nature;
    }

    set setIvs(ivs) {
        this._ivs = ivs;
    }

    set setEvs(evs) {
        this._evs = evs;
    }

    set setItem(item) {
        this._item = item;
    }

    set setMoves(moves) {
        this._moves = moves;
    }

    set setTypes(types) {
        this._types = types;
    }

    set setWeight(weight) {
        this._weight = weight;
    }

    set setHeight(height) {
        this._height = height;
    }

    set setHapiness(hapiness) {
        this._hapiness = hapiness;
    }

    set setFriendship(friendship) {
        this._friendship = friendship;
    }

    set setIsShiny(isShiny) {
        this._isShiny = isShiny;
    }

    set setCries(cries) {
        this._cries = cries;
    }
}