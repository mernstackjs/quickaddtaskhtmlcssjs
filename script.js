const taskInput = document.querySelector("#taskInput");
const taskDesc = document.querySelector("#taskDesc");
const taskPriority = document.querySelector("#taskPriority");
const tasksDiv = document.querySelector(".tasks");
const taskBtn = document.querySelector("#taskBtn");
const taskLeng = document.querySelector(".taskLeng");
const searchInput = document.querySelector("#searchInput");

let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}

function renderTasks(data) {
  tasksDiv.innerHTML = "";
  taskLeng.innerHTML = `You have ${data.length} tasks`;
  if (!data || data.length === 0) {
    tasksDiv.innerHTML = "<p>No tasks found</p>";
    return;
  }

  const taskList = document.createElement("ul");
  taskList.innerHTML = data
    .map(
      (t) => `
      <li>
        <span>ID: ${t.id}</span>
        <span>Task: ${t.task}</span>
        <span>Priority: ${t.priority}</span>
        <p>Description: ${t.description}</p>
        <p>Status: ${t.isComplete ? "Completed" : "Uncompleted"}</p>
        <button onclick="toggleComplete('${t.id}')">${
        t.isComplete ? "Mark Uncomplete" : "Mark Complete"
      }</button>
        <button onclick="deleteTask('${t.id}')">Delete</button>
      </li>
    `
    )
    .join("");

  tasksDiv.appendChild(taskList);
}

function addTask() {
  const inputValue = taskInput.value.trim();
  const descValue = taskDesc.value.trim();
  const priorityValue = taskPriority.value;

  if (!inputValue) {
    alert("Task name cannot be empty!");
    return;
  }

  const task = {
    id: `JF-${Date.now()}`,
    task: inputValue,
    description: descValue,
    priority: priorityValue,
    isComplete: false,
  };

  Tasks.push(task);
  saveToLocalStorage();
  renderTasks(Tasks);

  taskInput.value = "";
  taskDesc.value = "";
}

function toggleComplete(id) {
  Tasks = Tasks.map((t) =>
    t.id === id ? { ...t, isComplete: !t.isComplete } : t
  );
  saveToLocalStorage();
  renderTasks(Tasks);
}

function deleteTask(id) {
  Tasks = Tasks.filter((t) => t.id !== id);
  saveToLocalStorage();
  renderTasks(Tasks);
}

function searchTasks(e) {
  const query = e.target.value.toLowerCase();
  const filteredTasks = Tasks.filter((t) =>
    t.task.toLowerCase().includes(query)
  );
  renderTasks(filteredTasks);
}

taskBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", searchTasks);

// Initial render
renderTasks(Tasks);
