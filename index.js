const add = document.querySelector('.fa-plus')
const input = document.querySelector('.input')
const form = document.querySelector('.input-form')
const tasks = document.querySelector('.tasks')
let del = document.querySelector('.fa-times')


form.addEventListener('submit', e => {
    e.preventDefault()
});
add.addEventListener('click', e => {
    let task = input.value
    if (task=="") {
        alert('Please enter a task')
    }
    else {
        /*
        let newList = document.createElement('div')
        newList.classList.add('new-list')
        let checkbox = document.createElement('input')
        checkbox.classList.add('checkbox')
        checkbox.type = 'checkbox'
        let unique = Date.now().toString()
        checkbox.id = unique
        let label = document.createElement('label')
        label.for = unique
        let customCheckbox = document.createElement('span')
        customCheckbox.classList.add('custom-checkbox')
        label.appendChild(customCheckbox)
        let todo = document.createTextNode(task)
        label.appendChild(todo)
        let deleteList = document.createElement('span')
        deleteList.classList.add('delete-list')
        let awesome = document.createElement('i')
        awesome.classList.add('fas')
        awesome.classList.add('fa-times')
        deleteList.appendChild(awesome)
        newList.appendChild(checkbox)
        newList.appendChild(label)
        newList.appendChild(deleteList)
        tasks.appendChild(newList)
        */
        let newTask = `
<div class="new-list">
                    <input type="checkbox" name="" id="list1" class="checkbox">
                    <label for="list1">
                        <span class="custom-checkbox"></span>
                        Complete online JavaScript Course
                    </label>
                    <span class="delete-list"><i class="fas fa-times" aria-hidden="true"></i></span>
                </div>
`;
        tasks.innerHTML = newTask;
        
        input.value == ""
    }
})
del.addEventListener('click', e => {
    var item = e.target;
    console.log(item)
    item.closest('div').remove();
})
