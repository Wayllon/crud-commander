const commander = require("commander");
const Employee = require("./employee");
const Database = require("./database");

(async () => {
  commander
    .version("v1")
    .option("-n, --nome [value]", "adicionar nome")
    .option("-s, --setor [value]", "adicionar setor")

    .option("-c, --register", "cadastrar Funcionário")
    .option("-r, --lists [value]", "listar Funcionários pelo id")
    .option("-u, --update [value]", "atualizar Funcionário pelo id")
    .option("-d, --remove [value]", "remove Funcionário pelo id")
    .parse(process.argv);

  const employee = new Employee(commander);
  try {
    if (commander.register) {
      await Database.register(employee);
      console.log("item cadastrado com sucesso!");
      return;
    }

    if (commander.lists) {
      const id = commander.lists;
      const result = await Database.lists(id);
      console.log(result);
      return;
    }

    if (commander.update) {
      const id = commander.update;
      console.log("id", id);
      await Database.update(id, employee);
      console.log("item atualizado com sucesso!");
      return;
    }

    if (commander.remove) {
      const id = commander.remove;
      await Database.remove(id);
      console.log("item removido com sucesso!");
      return;
    }
  } catch (error) {
    console.error("falhou!", error);
    return;
  }
})();
