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

