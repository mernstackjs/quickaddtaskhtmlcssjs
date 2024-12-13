const taskInput = document.querySelector("#taskInput");
const tasksDiv = document.querySelector(".tasks");
const taskBtn = document.querySelector("#taskBtn");
const taskLeng = document.querySelector(".taskLeng");
let Tasks = [];
taskBtn.addEventListener("click", () => {
  const inputValue = taskInput.value.trim();

  if (!inputValue) {
    alert("Task cannot be empty!");
    return;
  }
  const randomId = Math.floor(Math.random() * 10000);
  randomId.toString();
  let generateId = `JF-${Date.now()}-${randomId}`;
  const data = {
    id: generateId,
    isComplate: false,
    task: inputValue,
  };
  Tasks.push(data);
  renderTasks(Tasks);

  taskInput.value = "";
});

function renderTasks(data) {
  tasksDiv.innerHTML = "";
  taskLeng.innerHTML = `Your Task is ${data.length}`;
  const taskH = document.createElement("h3");
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
    <p>Status: ${t.isComplate ? "Completed" : "Uncompleted"}</p>
  </li>
`
    )
    .join("");

  tasksDiv.appendChild(taskList);
}
