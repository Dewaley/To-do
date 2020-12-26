var add = document.querySelector('.fa-plus');
var input = document.querySelector('.input');
var form = document.querySelector('.input-form');
var img = document.querySelector('.background-image');
var tasks = document.querySelector('.tasks');
var dark = document.querySelector('.fa-moon');
var light = document.querySelector('.fa-sun');
var todo = document.querySelector('.todo-lists');
var storageName = 'taskData';

var taskTemplate = function taskTemplate(data) {
  var _data$checked;

  return "\n<div class=\"new-list\" id=\"".concat(data.arrIndex, "\">\n    <input type=\"checkbox\" name=\"\" id=").concat(data.id + '_' + data.arrIndex, " ").concat((_data$checked = data.checked) !== null && _data$checked !== void 0 ? _data$checked : '', " class=\"checkbox\">\n    <label for=").concat(data.id + '_' + data.arrIndex, ">\n        <span class=\"custom-checkbox\"></span>\n        ").concat(data.task, "\n    </label>\n    <span class=\"delete-list\"><i class=\"fas fa-times\" aria-hidden=\"true\"></i></span>\n</div>\n<slot class=\"add-new\"></slot>\n");
};

var mode = "modeData";
var base = JSON.parse(localStorage.getItem(mode));
dark.addEventListener('click', function (e) {
  darkMode();
  base = [];
  base.push("dark");
  addToModeStorage(base);
  reload();
});
light.addEventListener('click', function (e) {
  lightMode();
  base = [];
  base.push("light");
  addToModeStorage(base);
  reload();
});

addToModeStorage = function addToModeStorage(arr) {
  return localStorage.setItem(mode, JSON.stringify(arr));
};

function reload() {
  location.reload();
}

function darkMode() {
  light.style.opacity = "1";
  light.style.position = "relative";
  light.style.visibility = "visible";
  dark.style.opacity = "0";
  dark.style.position = "absolute";
  document.body.style.backgroundColor = "black";
  form.style.backgroundColor = "#1f1c1c";
  todo.style.backgroundColor = "#1f1c1c";
  document.body.style.color = "#fff";
  input.style.color = "#fff";
  img.src = 'images/bg-desktop-dark.jpg';
}

function lightMode() {
  light.style.opacity = "0";
  light.style.position = "absolute";
  light.style.visibility = "hidden";
  dark.style.opacity = "1";
  dark.style.position = "relative";
  document.body.style.backgroundColor = "rgb(238, 227, 227)";
  form.style.backgroundColor = "#fff";
  todo.style.backgroundColor = "#fff";
  document.body.style.color = "black";
  input.style.color = "black";
  img.src = "images/bg-desktop-light.jpg";
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask();
});
add.addEventListener('click', function (e) {
  addTask();
});

function addTask() {
  var task = input.value;

  if (task.trim() == "") {
    alert('Please enter a task');
  } else {
    var id = Date.now().toString();
    var renderData = {
      id: id,
      task: task,
      checked: '',
      arrIndex: countAll()
    };
    var newTask = taskTemplate(renderData);
    var newData = {
      value: input.value,
      checkState: ''
    };
    saveTask(newData);
    render(newTask);
    count();
  }
}

function render(newTask) {
  var addNewTask = document.querySelectorAll('.add-new');
  var addNewField = addNewTask[addNewTask.length - 1];
  addNewField.innerHTML = newTask;
  input.value = "";
}

window.addEventListener('click', function (e) {
  var target = e.target;

  if (target.classList.contains('fa-times')) {
    target.closest('div').remove();
    var arrIndex = parseInt(target.closest('div').id);
    deleteTask(arrIndex);
    count();
  }

  if (target.classList.contains('fa-plus')) {
    count();
  }

  if (target.classList.contains('checkbox')) {
    count();

    var _arrIndex = parseInt(target.closest('div').id);

    updateTask(_arrIndex);
  }

  if (target.classList.contains('clear-all')) {
    var slot = "<slot class=\"add-new\"></slot>";
    tasks.innerHTML = slot;
    count();
    addToStorage([]);
  }
});

function count() {
  var countChecked = document.querySelectorAll('.checkbox:checked');
  var items = document.querySelectorAll('.new-list');
  var number = document.querySelector('.number-of-items');
  var num = items.length - countChecked.length;

  if (num == 0) {
    number.textContent = '0 items left';
  } else if (num == 1) {
    number.textContent = '1 item left';
  } else if (num > 1) {
    number.textContent = num + ' items ' + 'left';
  }
}

function countAll() {
  return document.querySelectorAll('.checkbox').length;
}

function loadTask() {
  var getData = window.localStorage.getItem(storageName);

  if (getData === null) {
    return baseData();
  }

  var decodeData = window.localStorage.getItem(storageName);

  try {
    decodeData = JSON.parse(decodeData);
  } catch (e) {
    return baseData();
  }

  if (decodeData.length === 0) {
    return 'empty_list';
  }

  decodeData.forEach(function (item, index) {
    var id = Date.now().toString();
    var renderData = {
      id: id,
      task: item.value,
      arrIndex: index,
      checked: item.checkState
    };
    var newTask = taskTemplate(renderData);
    render(newTask);
  });
  /*
      let tempData = [
          { data: 'School Feee', checkState: 'checked' }
      ];
      */
}

function baseData() {
  var baseData = [];
  window.localStorage.setItem(storageName, JSON.stringify(baseData));
  return 'new_data_set';
}

function saveTask(newData) {
  var decodeData = getStorage();
  decodeData.push(newData);
  addToStorage(decodeData);
}

function getStorage() {
  var getData = localStorage.getItem(storageName);
  return JSON.parse(getData);
}

addToStorage = function addToStorage(arr) {
  return localStorage.setItem(storageName, JSON.stringify(arr));
};

function deleteTask(arrIndex) {
  var data = getStorage();
  data.splice(arrIndex, 1);
  addToStorage(data);
  updateTaskDivId();
}

function updateTask(arrIndex) {
  var data = getStorage();
  var checked = data[arrIndex].checkState == 'checked' ? '' : 'checked';
  console.log(checked);
  data[arrIndex].checkState = checked;
  addToStorage(data);
}

function updateTaskDivId() {
  document.querySelectorAll('.new-list').forEach(function (item, index) {
    return item.id = index;
  });
}

function loadMode() {
  if (base[0] == "light") {
    lightMode();
  } else if (base[0] == "dark") {
    darkMode();
  }
}

window.addEventListener('DOMContentLoaded', function (e) {
  loadTask();
  count();
  loadMode();
});