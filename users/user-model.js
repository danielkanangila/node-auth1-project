const db = require("../database/db-config");

class User {
  query() {
    return db("users");
  }

  find() {
    return this.query().select("id", "email");
  }

  async create(user) {
    const [id] = await this.query().insert(user, "id");

    return this.findById(id);
  }

  findById(id) {
    return this.query().where({ id }).first();
  }
}

module.exports = new User();
