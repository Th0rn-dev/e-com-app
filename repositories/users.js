const fs = require("fs");
const crypto = require("crypto");

class UsersRepository {
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

   async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {encoding: "utf8"}));
   }

   async create(attributes) {
        attributes.id = this.randomId();
        const rec = await this.getAll();
        rec.push(attributes);
         //write the updated  'rec' array back to the this.filename
       await this.writeAll(rec);
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

module.export = new UsersRepository('users.json');
