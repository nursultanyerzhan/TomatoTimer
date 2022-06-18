export class Task {
    #id;
    #name;
    #counter;
    #importance;
    constructor(name, counter = 0, importance = '') {
        this.#id = Math.round(Math.random() * 10000000);
        this.#name = name;
        this.#counter = counter;
        this.#importance = importance;
    }

    getId () { return this.#id; }

    setName (newName) {
        this.#name = newName;
    }

    getName () { return this.#name; }

    incrementCount () {
        this.#counter++;
    }

    getImportance () { return this.#importance; }

    getCounter() { return this.#counter; }
}