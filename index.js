const add = document.querySelector('.fa-plus')
const input = document.querySelector('.input')
const form = document.querySelector('.input-form')
let tasks = document.querySelector('.tasks')
let dark = document.querySelector('.fa-moon')
let light = document.querySelector('.fa-sun')
let todo = document.querySelector('.todo-lists');
let storageName = 'taskData';
let taskTemplate = (data) => `
<div class="new-list" id="${data.arrIndex}">
    <input type="checkbox" name="" id=${data.id+'_'+data.arrIndex} ${data.checked ?? ''} class="checkbox">
    <label for=${data.id+'_'+data.arrIndex}>
        <span class="custom-checkbox"></span>
        ${data.task}
    </label>
    <span class="delete-list"><i class="fas fa-times" aria-hidden="true"></i></span>
</div>
<slot class="add-new"></slot>
`;

dark.addEventListener('click', e => {
    light.style.opacity = "1"
    light.style.position = "relative"
    light.style.visibility = "visible"
    dark.style.opacity = "0"
    dark.style.position = "absolute"
    document.body.style.backgroundColor = "black"
    form.style.backgroundColor = "#1f1c1c"
    todo.style.backgroundColor = "#1f1c1c"
    document.body.style.color = "#fff"
    input.style.color = "#fff";
})
light.addEventListener('click', e => {
    light.style.opacity = "0"
    light.style.position = "absolute"
    light.style.visibility = "hidden"
    dark.style.opacity = "1"
    dark.style.position = "relative"
    document.body.style.backgroundColor = "rgb(238, 227, 227)"
    form.style.backgroundColor = "#fff"
    todo.style.backgroundColor = "#fff"
    document.body.style.color = "black"
    input.style.color = "black";
})
form.addEventListener('submit', e => {
    e.preventDefault()
});
add.addEventListener('click', e => {
    let task = input.value
    if (task.length > 30) {
        input.value = ""
        alert("Task must have less than 30 characters")
    }
    else if (task == "") {
        alert('Please enter a task')
    } else {
        let id = Date.now().toString()
        let renderData = {
            id: id,
            task: task,
            checked: '',
            arrIndex: countAll()
        }
        let newTask = taskTemplate(renderData);
        let newData = { value: input.value, checkState: '' };
        saveTask(newData);
        render(newTask);
    }
})

function render(newTask) {
    let addNewTask = document.querySelectorAll('.add-new');
    let addNewField = addNewTask[addNewTask.length - 1];
    addNewField.innerHTML = newTask;
    input.value = "";
}

window.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('fa-times')) {
        target.closest('div').remove();
        let arrIndex = parseInt(target.closest('div').id);
        deleteTask(arrIndex);
        count()
    }
    if (target.classList.contains('fa-plus')) {
        let countChecked = document.querySelectorAll('.checkbox:checked');
        let items = document.querySelectorAll('.new-list')
        let number = document.querySelector('.number-of-items')
        let num = items.length - countChecked.length
        if (num == 0) {
            number.textContent = '0 items left'
        } else if (num == 1) {
            number.textContent = '1 item left'
        } else if (num > 1) {
            number.textContent = num + ' items ' + 'left'
        }
    }
    if (target.classList.contains('checkbox')) {
        count();
        let arrIndex = parseInt(target.closest('div').id);
        updateTask(arrIndex);
    }
    if (target.classList.contains('clear-all')) {
        let slot = `<slot class="add-new"></slot>`
        tasks.innerHTML = slot
        count();
        addToStorage([]);
    }
})

function count() {
    let countChecked = document.querySelectorAll('.checkbox:checked');
    let items = document.querySelectorAll('.new-list')
    let number = document.querySelector('.number-of-items')
    let num = items.length - countChecked.length
    if (num == 0) {
        number.textContent = '0 items left'
    } else if (num == 1) {
        number.textContent = '1 item left'
    } else if (num > 1) {
        number.textContent = num + ' items ' + 'left'
    }
}

function countAll() {
    return document.querySelectorAll('.checkbox').length;
}

function loadTask() {
    let getData = window.localStorage.getItem(storageName);
    if (getData === null) {
        return baseData();
    }

    let decodeData = window.localStorage.getItem(storageName);
    try {
        decodeData = JSON.parse(decodeData);
    } catch (e) {
        return baseData();
    }
    if (decodeData.length === 0) { return 'empty_list'; }
    decodeData.forEach((item, index) => {
        let id = Date.now().toString();
        let renderData = {
            id: id,
            task: item.value,
            arrIndex: index,
            checked: item.checkState
        }
        let newTask = taskTemplate(renderData);
        render(newTask);

    });

    /*
        let tempData = [
            { data: 'School Feee', checkState: 'checked' }
        ];
        */
}

function baseData() {
    let baseData = [];
    window.localStorage.setItem(storageName, JSON.stringify(baseData));
    return 'new_data_set';
}

function saveTask(newData) {
    let decodeData = getStorage();
    decodeData.push(newData);
    addToStorage(decodeData);
}

function getStorage() {
    let getData = localStorage.getItem(storageName);
    return JSON.parse(getData);
}
addToStorage = arr => localStorage.setItem(storageName, JSON.stringify(arr));

function deleteTask(arrIndex) {
    let data = getStorage();
    data.splice(arrIndex, 1);
    addToStorage(data);
    updateTaskDivId();

}

function updateTask(arrIndex) {
    let data = getStorage();
    let checked = data[arrIndex].checkState == 'checked' ? '' : 'checked';
    console.log(checked)
    data[arrIndex].checkState = checked;
    addToStorage(data)

}

function updateTaskDivId() {
    document.querySelectorAll('.new-list').forEach((item, index) => item.id = index);
}

window.addEventListener('DOMContentLoaded', loadTask);
