const taskInput = document.getElementById('tasknput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

//Save Tasks
document.addEventListener('DOMContentLoaded', loadTask);

// add new task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if(taskText === '');
            
    const li = document.createElement('Li')
    li.textContent = taskText;

    //mark as done
    li.addEventListener('click', () =>{
        li.classList.toggle('done');
     })
    //remove btn
    const removeBtn = document.createElement('button')

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add = ('remove-btn');
    removeBtn.addEventListener('click', () => {
        e.stopPropagation();
        li.remove();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';

});