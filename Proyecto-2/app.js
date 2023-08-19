const btnAddTask = document.querySelector('#btnAddTask');
const listTasks = document.querySelector('#list-tasks');


function addTask(){
    const taskText = document.querySelector('#task-text').value;
    if(taskText === ''){
        alert('No puedes agregar una tarea vacía');
        return;
    }
    const newTask = document.createElement('LI');
    const spanCheck = document.createElement('SPAN');
    const newParagraph = document.createElement('P');
    const spanDelete = document.createElement('SPAN');
    spanDelete.classList.add('btn-delete-task');
    spanCheck.classList.add('check-task');
    newParagraph.textContent = taskText;
    spanDelete.textContent = '\u00D7';  
    
    newTask.appendChild(spanCheck);
    newTask.appendChild(newParagraph);
    newTask.appendChild(spanDelete);

    listTasks.appendChild(newTask);
    document.querySelector('#task-text').value = '';
}
const deleteTask = (e) => {
    e.target.parentElement.remove();
}
btnAddTask.addEventListener('click', addTask);
document.addEventListener('click',saveData)
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('listTasks')){
        listTasks.innerHTML = localStorage.getItem('listTasks');
    }
})

listTasks.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-delete-task')){
        deleteTask(e);
    }else if(e.target.classList.contains('check-task')){
        e.target.parentElement.classList.toggle('checked');
    }
})


function saveData(){
    localStorage.setItem('listTasks', listTasks.innerHTML);
}