export class Task {
    #id;
    name;
    #counter;
    constructor(name, counter = 0) {
        this.#id = Math.round(Math.random() * 10000000);
        this.name = name;
        this.#counter = counter;
    }

    getId() { return this.#id; }

    setName(newName) {
        this.name = newName;
    }

    getName() { return this.name; }

    incrementCount() {
        this.#counter++;
    }
    clearCounter() {
        this.#counter = 0;
    }

    getCounter() { return this.#counter; }

    getImportance() {
        throw new Error('Not implemented');
    }
}

export class ImportantTask extends Task {
    #importance;
    constructor (name) { 
        super();
        this.name = name;
        this.#importance = 'important';
    }
    getImportance() {
        return this.#importance;
    }
}

export class DefaultTask extends Task {
    #importance;
    constructor (name) { 
        super();
        this.name = name;
        this.#importance = 'default';
    }
    getImportance() {
        return this.#importance;
    }
}

export class SosoTask extends Task {
    #importance;
    constructor (name) { 
        super();
        this.name = name;
        this.#importance = 'so-so';
    }
    getImportance() {
        return this.#importance;
    }
}