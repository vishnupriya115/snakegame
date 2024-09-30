document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value;

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  
  const taskSpan = document.createElement('span');
  taskSpan.classList.add('task-text');
  taskSpan.textContent = taskText;
  
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit');
  editBtn.addEventListener('click', () => editTask(taskSpan));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => taskList.removeChild(li));
  
  const hr = document.createElement('hr');
  
  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.appendChild(hr);
  
  taskList.appendChild(li);
  taskInput.value = '';
}

function editTask(taskSpan) {
  const newTask = prompt('Edit your task:', taskSpan.textContent);
  if (newTask !== null && newTask.trim() !== '') {
    taskSpan.textContent = newTask;
  }
}
