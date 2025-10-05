const taskInput = document.getElementById('tasknput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

//Save Tasks
document.addEventListener('DOMContentLoaded', loadTask);

// add new task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText === '');

    addTaskToDOM(taskText);
    saveTask(taskText);

    taskInput.value = '';
});

//Add task to the UI
function addTaskToDOM(taskText, done = false){
    const li = taskText;

    if (done) li.classList.add('done');

    //mark as done
    li.addEventListener('click', () =>{
        li.classList.toggle('done');
        updateTaskStatus(taskText, li.classList.contains('done'));
    })

    //remove btn
    const removeBtn = document.createElement('button')

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add = ('remove-btn');
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        removeTask(taskText);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}

// Save task to local storage
function saveTask(taskText){
    const tasks = getTasks();
    tasks.push({text:taskText, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load tasks from localStorage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(task => addTaskToDOM(task.text, task.done));
}

// Get all tasks from local storage
function getTasks(){
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

//Remove tasks from local storage
function removeTask(taskText) {
  const tasks = getTasks().filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update done/undone status in localStorage
function updateTaskStatus(taskText, done) {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task => 
    task.text === taskText ? { ...task, done } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}


// --------------------
// SIMPLE TESTS SECTION
// --------------------
function runTests() {
  console.log("Running To-Do List Tests...");

  // Clear localStorage before testing
  localStorage.clear();

  // 1️⃣ Test: Add Task
  saveTask("Test Task 1");
  const tasks1 = getTasks();
  console.assert(tasks1.length === 1, "❌ Add Task failed");
  console.assert(tasks1[0].text === "Test Task 1", "❌ Task name incorrect");

  // 2️⃣ Test: Mark Task as Done
  updateTaskStatus("Test Task 1", true);
  const tasks2 = getTasks();
  console.assert(tasks2[0].done === true, "❌ Mark as done failed");

  // 3️⃣ Test: Remove Task
  removeTask("Test Task 1");
  const tasks3 = getTasks();
  console.assert(tasks3.length === 0, "❌ Remove Task failed");

  console.log("✅ All tests completed!");
}

// Uncomment this line to run the tests automatically on load:
runTests();
