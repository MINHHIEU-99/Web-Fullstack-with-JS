'use strict';

const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');


let currentUser = getFromStorage('CURRENT_USER');
let todoArr = JSON.parse(getFromStorage('TOTAL_TASKS', '[]'));

if (currentUser != undefined) currentUser = JSON.parse(currentUser);

class Tasks {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}

function parseTask(taskData) {
    const task = new Tasks(taskData.task, taskData.owner, taskData.isDone);
    return task;
}

function clearInput() {
    taskInput.value = '';
}

todoList.addEventListener('click', function (e) {
    // Change the state of task completed and not completed
    e.target.classList.toggle('checked');
    // console.log(e.target);

    function getTaskName(n) {
        const contentTask = n.textContent;
        return contentTask.split('').slice(0, -1).join('');
    }

    if (e.target.classList.contains('close')) {        
        alert('Are you sure ?');
        // console.log(e.target);

        // Get name of target task
        const taskName = getTaskName(e.target.parentNode);

        // Get index of target task 
        const index = todoArr.findIndex(e => e.task == taskName);

        // Delete task
        todoArr.splice(index, 1);

        // Re-render todoArr
        renderTodoList(currentUser, todoArr);
    }
    else {
        const taskName = getTaskName(e.target);

        const index = todoArr.findIndex(e => e.task == taskName);

        // Change instance isDone of target task object
        todoArr[index].isDone = e.target.classList.contains('checked') ? true : false;
    }

    // Save to local storage
    saveToStorage('TOTAL_TASKS', JSON.stringify(todoArr));


});

addBtn.addEventListener('click', function () {
    if (currentUser == undefined) {
        alert('Please log in your account');
        clearInput();
    } else {
        // currentUser = JSON.parse(currentUser);
        console.log(1);
        const mission = {
            task: taskInput.value,
            owner: currentUser.userName,
            isDone: false,
        };
        function validateData(data) {
            if (data.task == '') {
                alert('Title of task must be filled');
                return false;
            } else return 1;
        }
        if (validateData(mission)) {
            const newTask = parseTask(mission);
            todoArr.push(newTask);
            saveToStorage('TOTAL_TASKS', JSON.stringify(todoArr));
            renderTodoList(currentUser, todoArr);
            console.log(todoArr);

            clearInput();
        }
    }
});

const renderTodoList = function (currentUser, taskArr) {
    if (currentUser == undefined) todoList.innerHTML = '';
    else {
        todoList.innerHTML = '';
        taskArr
            .filter(e => e.owner == currentUser.userName)
            .forEach(element => {                
                if (element.isDone) {
                    todoList.insertAdjacentHTML(
                        'beforeend',
                        `<li class="checked">${element.task}<span class="close">×</span></li>`
                    );
                }
                else {
                    todoList.insertAdjacentHTML(
                        'beforeend',
                        `<li>${element.task}<span class="close">×</span></li>`
                    );
                }
            });
    }
};


// currentUser = JSON.parse(currentUser);
console.log(currentUser);
console.log(todoArr);

renderTodoList(currentUser, todoArr);

