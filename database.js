const { writeFile, readFile } = require("fs");
const { promisify } = require("util");
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
];

class Database {
  constructor() {
    this.FILENAME = "employees.json";
  }

  async getFile() {
    const file = await readFileAsync(this.FILENAME);
    return JSON.parse(file.toString());
  }

  async writeFileData(data) {
    await writeFileAsync(this.FILENAME, JSON.stringify(data));
    return true;
  }

  async register(employee) {
    const data = await this.getFile();
    const id = employee.id <= 2 ? employee.id : Date.now();
    const employeeId = {
      ...employee,
      id,
    };

    return await this.writeFileData([...data, employeeId]);
  }

  async lists(id) {
    const data = await this.getFile();
    return data.filter((item) => (id ? item.id == id : true));
  }

  async update(id, updates) {
    const data = await this.getFile();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("funcionário não existe!");
    }

    const current = data[index];
    data.splice(index, 1);

    const updatedObject = JSON.parse(JSON.stringify(updates));
    const updatedData = Object.assign({}, current, updatedObject);

    return await this.writeFileData([...data, updatedData]);
  }

  async remove(id) {
    if (!id) {
      await this.writeFileData([]);
      return true;
    }

    const data = await this.getFile();

    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("funcionário não existe!");
    }
    const current = data[index];
    data.splice(index, 1);
    await this.writeFileData(data);
    return true;
  }
}

module.exports = new Database();
