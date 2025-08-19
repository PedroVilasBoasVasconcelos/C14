import { v4 as uuidv4 } from "uuid";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const form = document.querySelector(".input-group");
const taskCount = document.getElementById("taskCount");

let tasks = [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    // Crie um span para o texto da tarefa
    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text" + (task.completed ? " completed" : "");

    li.appendChild(span);

    // Alterna status de concluído ao clicar no texto
    li.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") {
        // evita conflito com botão de deletar
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

  // Atualiza o contador de tarefas pendentes
  const pendingCount = tasks.filter((t) => !t.completed).length;
  if (taskCount) {
    taskCount.textContent = `Tarefas pendentes: ${pendingCount}`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ id: uuidv4(), text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

const themeSelect = document.getElementById("themeSelect");

// Função para aplicar o tema
function applyTheme(theme) {
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// Detecta o tema do sistema
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Evento de troca do seletor
if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    const theme = themeSelect.value;
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  });

  // Carrega o tema salvo ou do sistema
  const savedTheme = localStorage.getItem("theme") || "system";
  themeSelect.value = savedTheme;
  applyTheme(savedTheme);

  // Atualiza se o usuário mudar o tema do sistema
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (themeSelect.value === "system") {
        applyTheme("system");
      }
    });
}

// Renderiza ao carregar a página
renderTasks();
