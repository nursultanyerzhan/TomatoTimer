class CounterClass {
    #id;
    #name;
    #count;
    constructor(name, count = 0) {
        this.#id = Math.round(Math.random() * 10000000);
        this.#name = name;
        this.#count = count;
    }

    setName(newName) {
        this.#name = newName;
    }

    incrementCount() {
        this.#count++;
    }
}
