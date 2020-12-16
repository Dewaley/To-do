const add = document.querySelector('.fa-plus')
const input = document.querySelector('.input')
const form = document.querySelector('.input-form')
    //let tasks = document.querySelector('.tasks')



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
<div class="new-list">
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
    }
})
