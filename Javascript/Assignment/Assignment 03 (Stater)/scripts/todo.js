'use strict';

const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');


let currentUser = getFromStorage('CURRENT_USER');
let todoArr = JSON.parse(getFromStorage('TOTAL_TASKS', '[]'));

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

    // Get name of target task 
    const contentTask = e.target.parentElement.textContent;
    const taskName = contentTask.split('').slice(0, -1).join('');

    // Get index of target task 
    const index = todoArr.findIndex(e => e.task == taskName);
    

    if (e.target.classList.contains('close')) {
        alert('Are you sure ?');

        // Delete task
        todoArr.splice(index, 1);
        // Save to local storage
        saveToStorage('TOTAL_TASKS', JSON.stringify(todoArr));

        // Re-render todoArr
        renderTodoList(currentUser, todoArr);
    }
    else {
        todoArr[index].isDone = this.classList.contains('checked') ? true : false;
    }
});

addBtn.addEventListener('click', function () {
    if (currentUser == undefined) {
        alert('Please log in your account');
        clearInput();
    } else {
        currentUser = JSON.parse(currentUser);
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
        currentUser = JSON.parse(currentUser);
        taskArr
            .filter(e => e.owner == currentUser.userName)
            .forEach(element => {
                todoList.insertAdjacentHTML(
                    'beforeend',
                    `<li>${element.task}<span class="close">×</span></li>`
                );
            });
    }
};

renderTodoList(currentUser, todoArr);
console.log(currentUser);
console.log(todoArr);


