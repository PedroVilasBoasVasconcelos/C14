import { v4 as uuidv4 } from "uuid";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const form = document.querySelector(".input-group");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "completed" : "";

    // Alterna status de concluído ao clicar no texto
    li.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") { // evita conflito com botão de deletar
        task.completed = !task.completed;
        renderTasks();
      }
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.className = "delete-btn";
    removeBtn.onclick = (event) => {
      event.stopPropagation(); // evita marcar como concluído ao deletar
      li.classList.add("removing");
      setTimeout(() => {
        tasks = tasks.filter((t) => t.id !== task.id);
        renderTasks();
      }, 400);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ id: uuidv4(), text });
    taskInput.value = "";
    renderTasks();
  }
});
