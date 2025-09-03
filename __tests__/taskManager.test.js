import { TaskManager } from "../src/taskManager.js";

describe("TaskManager", () => {
  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  test("deve adicionar uma tarefa corretamente", () => {
    const task = manager.addTask("Estudar Jest");
    expect(manager.getTasks()).toContainEqual(task);
  });

  test("deve remover uma tarefa existente", () => {
    const task = manager.addTask("Ler documentação");
    manager.removeTask(task.id);
    expect(manager.getTasks()).not.toContainEqual(task);
  });

  test("não deve adicionar tarefa sem descrição válida", () => {
    expect(() => manager.addTask("")).toThrow("Descrição inválida da tarefa");
    expect(() => manager.addTask(123)).toThrow("Descrição inválida da tarefa");
  });

  test("não deve remover tarefa inexistente", () => {
    expect(() => manager.removeTask("id_invalido")).toThrow(
      "Tarefa não encontrada"
    );
  });
});
