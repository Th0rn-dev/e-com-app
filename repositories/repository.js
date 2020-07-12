const fs = require("fs");
const crypto = require("crypto");

module.exports = class Repository {
    constructor(filename) {
        if (!filename){
            throw new Error("Creating a repository requires a filename");
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch(err) {
            fs.writeFileSync(this.filename, "[]");
        }
    }

    async create(attributes) {
        attributes.id = this.randomId();

        const records = await this.getAll();
        records.push(attributes);
        await this.writeAll();

        return attributes;
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {encoding: "utf8"}));
    }

    async writeAll(rec) {
        await fs.promises.writeFile(this.filename, JSON.stringify(rec, null, 2));
    }

    randomId() {
        return crypto.randomBytes(8).toString("hex");
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record =>  record.id !== id);
        await this.writeAll(filteredRecords);
    }

    async update(id, attributes) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Records with id=${id} not found!`);
        }

        Object.assign(record, attributes);
        await this.writeAll(records);
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            if (found) {
                return record;
            }
        }
    }
}