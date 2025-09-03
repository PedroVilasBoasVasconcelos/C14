import { TaskManager } from "./taskManager.js";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const form = document.querySelector(".input-group");
const taskCount = document.getElementById("taskCount");

const taskManager = new TaskManager();

function renderTasks() {
  taskList.innerHTML = "";
  taskManager.getTasks().forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.description;
    span.className = task.done ? "completed" : "";
    li.appendChild(span);

    li.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") {
        taskManager.toggleTask(task.id);
        renderTasks();
      }
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.className = "delete-btn";
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      li.classList.add("removing");
      setTimeout(() => {
        taskManager.removeTask(task.id);
        renderTasks();
      }, 200);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  taskCount.textContent = `Tarefas pendentes: ${taskManager.getPendingCount()}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    taskManager.addTask(text);
    taskInput.value = "";
    renderTasks();
  }
});

renderTasks();
