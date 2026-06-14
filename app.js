const API = "http://localhost:5000/tasks";

async function loadTasks() {
  let res = await fetch(API);
  let data = await res.json();

  document.getElementById("list").innerHTML = "";

  data.forEach(task => {
    let div = document.createElement("div");

    div.innerHTML = `
      <span style="text-decoration:${task.done ? 'line-through' : 'none'}">
        ${task.title}
      </span>

      <button onclick="toggleTask(${task.id})">Done</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    document.getElementById("list").appendChild(div);
  });
}

async function addTask() {
  let title = document.getElementById("taskInput").value;

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ title })
  });

  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: "PUT" });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTasks();
}

loadTasks();