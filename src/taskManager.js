import { v4 as uuidv4 } from "uuid";

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    if (!description || typeof description !== "string") {
      throw new Error("Descrição inválida da tarefa");
    }

    const newTask = { id: uuidv4(), description, done: false };
    this.tasks.push(newTask);
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error("Tarefa não encontrada");
    task.done = !task.done;
    return task;
  }

  removeTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Tarefa não encontrada");
    return this.tasks.splice(index, 1)[0];
  }

  getTasks() {
    return this.tasks;
  }

  getPendingCount() {
    return this.tasks.filter((t) => !t.done).length;
  }
}
