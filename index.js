const add = document.querySelector('.fa-plus')
const input = document.querySelector('.input')
const form = document.querySelector('.input-form')
let tasks = document.querySelector('.tasks')
let dark = document.querySelector('.fa-moon')
let light = document.querySelector('.fa-sun')
let todo = document.querySelector('.todo-lists')

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
    if (task == "") {
        alert('Please enter a task')
    } else {
        let id = Date.now().toString()
        let newTask = `
<div class="new-list" draggable="true">
    <input type="checkbox" name="" id=${id} class="checkbox">
    <label for=${id}>
        <span class="custom-checkbox"></span>
        ${task}
    </label>
    <span class="delete-list"><i class="fas fa-times" aria-hidden="true"></i></span>
</div>
<slot class="add-new"></slot>
`;
        let addNewTask = document.querySelectorAll('.add-new');
        let addNewField = addNewTask[addNewTask.length - 1];
        addNewField.innerHTML = newTask;
        input.value = "";
    }
})
window.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('fa-times')) {
        target.closest('div').remove();
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
        count()
    }
    if (target.classList.contains('clear-all')) {
        let slot = `<slot class="add-new"></slot>`
        tasks.innerHTML = slot
        count()
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