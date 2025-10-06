const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Utility: generate a short unique id
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

// Add by button
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return; // ignore empty
  const task = { id: uid(), text, done: false };
  saveTask(task);
  addTaskToDOM(task);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const span = document.createElement('span');
  span.textContent = task.text;
  li.appendChild(span);

  if (task.done) li.classList.add('done');

  // toggle done when clicking the item (but not the remove button)
  li.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) return;
    li.classList.toggle('done');
    updateTaskStatus(task.id, li.classList.contains('done'));
  });

  // remove button
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeTask(task.id);
    li.remove();
  });

  li.appendChild(removeBtn);
  return li;
}

function addTaskToDOM(task) {
  const li = createTaskElement(task);
  taskList.appendChild(li);
}

// Storage helpers - some AI help.
function getTasks() {
  try {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  } catch (e) {
    return [];
  }
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((t) => addTaskToDOM(t));
}

function removeTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(id, done) {
  const tasks = getTasks().map((t) => (t.id === id ? { ...t, done } : t));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput && taskInput.focus();
