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

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.className = "delete-btn";
    removeBtn.onclick = () => {
      li.classList.add("removing");
      setTimeout(() => {
        tasks = tasks.filter((t) => t.id !== task.id);
        renderTasks();
      }, 400); // tempo igual ao CSS .removing
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
