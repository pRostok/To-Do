import tasks from './tasks';
import uiHandle from './interface';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import getTime from 'date-fns/getTime';
import isPast from 'date-fns/isPast';

const content = document.getElementById('content');
const addBtn = document.getElementById('addTask');
let taskDate;
let taskStamp;

const datePicker = document.getElementById('taskDate');
datePicker.addEventListener('change', function () {
    taskDate = format(parseISO(datePicker.value), "dd MMMMMMMM yyyy");
    taskStamp = getTime(parseISO(datePicker.value));
});


function clear() {
    document.getElementById('taskTitle').value = ''
    datePicker.value = '';
}

function drawTasks() {
    content.innerHTML = '';
    tasks.getList().sort((a, b) => {
        return (a.timestamp) - (b.timestamp);
    })
    tasks.getList().forEach((task, i) => {
        let newTask = uiHandle.createCard(task, i.toString());
        content.append(newTask);
    });
    actRemoveBtns();
    actCompleteBtns();
}

function actRemoveBtns() {
    [...document.querySelectorAll('.btn-danger')].forEach(btn => {
        let id = btn.dataset.taskId;
        btn.addEventListener('click', function () {
            tasks.remove(id);
            tasks.updateStorage();
            drawTasks();
        })

    })
}

function actCompleteBtns() {
    [...document.querySelectorAll('.complete-btn')].
        forEach(btn => {
            let id = btn.dataset.taskId;
            btn.addEventListener('click', function () {
                tasks.changeStatus(id);
                tasks.updateStorage();
                drawTasks();
                console.log('eyo')
            })
        })
}

function startApp() {
    tasks.checkTasks();
    drawTasks();
}

addBtn.addEventListener('click', function () {
    let thisDate = parseISO(datePicker.value);
    if (isValid(thisDate) && !isPast(thisDate)) {
        let taskTitle = document.getElementById('taskTitle').value;
        tasks.save(tasks.generateInfo(taskTitle, taskDate, taskStamp));
        tasks.updateStorage();
        drawTasks();
        clear();
    } else if (!isValid(thisDate)) {
        alert('Please select a date.')
    } else if (isPast(thisDate)) {
        alert("You can't go back in time, silly");
    }
});



startApp()
