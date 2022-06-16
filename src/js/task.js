export class Task {
    #id;
    #name;
    #counter;
    constructor(name, counter = 0) {
        this.#id = Math.round(Math.random() * 10000000);
        this.#name = name;
        this.#counter = counter;
    }

    getId() { return this.#id; }

    setName(newName) {
        this.#name = newName;
    }

    getName() { return this.#name; }

    incrementCount() {
        this.#counter++;
    }

    getCounter() { return this.#counter; }
}

// class ImportantTask extends Task {
//     constructor()
// }