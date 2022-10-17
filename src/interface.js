
import tasks from './tasks';

const interfaceHandler = (function () {

    const _createElement = (element, classNames, id) => {

        let newElement = document.createElement(element);

        classNames.forEach(className => {
            newElement.classList.add(className);
        })

        if (id !== undefined) {
            newElement.setAttribute('id', id);
        }

        return newElement;
    }

    const createCard = (task, taskId) => {
        let container = _createElement('div', ['card', 'col-sm-4'], taskId);

        let body = _createElement('div', ['card-body']);

        let title = _createElement('h5', ['card-title']);
        title.innerText = task.title;

        let description = _createElement('p', ['card-text']);
        description.innerText = task.date;

        let completeBtn = _createElement('a', ['btn', 'btn-primary', 'complete-btn']);
        if (task.complete) {
            completeBtn.classList.add('complete');
            completeBtn.innerText = 'Completed';
        } else {
            completeBtn.innerText = 'Complete';
        }
        completeBtn.dataset.taskId = taskId;

        let removeBtn = _createElement('a', ['btn', 'btn-danger']);
        removeBtn.innerText = 'Delete';
        removeBtn.dataset.taskId = taskId;

        body.append(title, description, completeBtn, removeBtn)
        container.append(body);

        return container;

    }

    return {
        createCard
    }

})();

export { interfaceHandler as default }