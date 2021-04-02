const { deepEqual } = require("assert");
const Database = require("./database");

const DEFAULT_ITEM_REGISTER = {
  nome: "Luiz",
  setor: "RH",
  id: 1,
};

const DEFAULT_ITEM_UPDATE = {
  nome: "Mariana",
  setor: "TI",
  id: 2,
};

describe("Suite de manipulação de herois", () => {
  before(async () => {
    await Database.remove();
    await Database.register(DEFAULT_ITEM_REGISTER);
    await Database.register(DEFAULT_ITEM_UPDATE);
  });

  it("deve cadastrar um funcionário", async () => {
    const expected = DEFAULT_ITEM_REGISTER;
    await Database.register(DEFAULT_ITEM_REGISTER);

    const [result] = await Database.lists(expected.id);
    deepEqual(result, expected);
  });

  it("deve listar um funcionário pelo id", async () => {
    const expected = DEFAULT_ITEM_REGISTER;

    const result = await Database.lists(1);
    deepEqual(result[0], expected);
  });

  it("deve atualizar um funcionario pelo id", async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      nome: "Aline",
      setor: "Financeiro",
    };
    await Database.update(expected.id, {
      nome: expected.nome,
      setor: expected.setor,
    });

    const [result] = await Database.lists(expected.id);
    deepEqual(result, expected);
  });
});
