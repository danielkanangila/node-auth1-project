const db = require("../database/db-config");

class User {
  query() {
    return db("users");
  }

  find() {
    return this.query().select("id", "displayName", "email");
  }

  create(user) {
    return this.query()
      .insert(user)
      .then((ids) => this.findById(ids[0]));
  }

  findById(id) {
    return this.query()
      .where({ id })
      .select("id", "displayName", "email")
      .first();
  }
}

module.exports = new User();
