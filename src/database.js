/**
 * { "users": [{...}]}
 * # - Ao adicionar na definição da class, se torna uma propriedade privada
 */

import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);
console.log(databasePath);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const db = this.#database[table] ?? [];
    return db;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}