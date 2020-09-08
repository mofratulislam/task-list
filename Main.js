
document.getElementById('task-form').addEventListener('submit', function(e) {
    if (document.getElementById('new-task').value === '') {
        alert('Add a task!');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(document.getElementById('new-task').value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        document.querySelector('ul').appendChild(li);

        storeTaskInLocalStorage(document.getElementById('new-task').value);

        document.getElementById('new-task').value = '';


    }
    e.preventDefault();
});

document.querySelector('ul').addEventListener('click', function(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
});

document.getElementById('clear-btn').addEventListener('click', function(e) {
    while (document.querySelector('ul').firstChild) {
        document.querySelector('ul').removeChild(document.querySelector('ul').firstChild);
    }
    localStorage.clear();
});
document.getElementById('task-filter').addEventListener('keyup', function(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        document.querySelector('ul').appendChild(li);
    });
});


// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); 

    tasks.forEach((task, index) =>{
        if(li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}