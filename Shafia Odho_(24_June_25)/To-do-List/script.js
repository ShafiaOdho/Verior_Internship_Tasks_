document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      if (task.done) li.classList.add('done');

      li.innerHTML = `
        <span class="task-text" data-index="${index}">${task.text}</span>
        <button class="delete-button" data-index="${index}">X</button>
      `;
      taskList.appendChild(li);
    });
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text, done: false });
      saveTasks(tasks);
      loadTasks();
      taskInput.value = '';
    }
  });

  taskList.addEventListener('click', (e) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (e.target.classList.contains('delete-button')) {
      const index = e.target.getAttribute('data-index');
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    }

    if (e.target.classList.contains('task-text')) {
      const index = e.target.getAttribute('data-index');
      tasks[index].done = !tasks[index].done;
      saveTasks(tasks);
      loadTasks();
    }
  });

  loadTasks();
});
