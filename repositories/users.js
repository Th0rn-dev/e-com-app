const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

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
        const salt = crypto.randomBytes(8).toString("hex");
        const buf = await scrypt(attributes,password, salt, 64);

        const records = await this.getAll();
        const record = ({
            ...attributes,
            password: `${buf.toString("hex")}.${salt}`
        });
        records.push(record);
       await this.writeAll(records);
       return record;
   }

   async comparePasswords(saved, supplied) {
        // Saved -> password saves in database. 'hashed.salt'
       // Supplied -> password given to us by user trying sign in
       const [hashed, salt] = saved.split(".");
       const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
       return hashed === hashedSuppliedBuf.toString("hex");
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
