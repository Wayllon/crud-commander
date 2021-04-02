class Employee {
  constructor({ id, nome, setor }) {
    this.nome = nome;
    this.setor = setor;
    this.id = id || Date.now();
  }
}
module.exports = Employee;
