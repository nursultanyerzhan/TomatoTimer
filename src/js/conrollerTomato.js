import { Tomato } from './tomato.js';
import { Task } from './task.js';

export class ConrollerTomato {
    constructor() {

    }

    static setEventListenerToStart(btnStart) {
        btnStart.addEventListener('click', () => {
            const tomato = new Tomato();
            tomato.runTimer();
        });
    }

    static setEventListenerToStop(btnStop) {
        btnStop.addEventListener('click', () => {
            const tomato = new Tomato();
            tomato.stopTimer();
        });
    }

    static switchImportance(importance) {
        if (importance === 'default')
            return 'important';
        if (importance === 'important')
            return 'so-so';
        if (importance === 'so-so')
            return 'default';
    }

    static setEventListenerToChooseImportance(chooseImportance) {
        chooseImportance.addEventListener('click', ({ target }) => {
            const importance = target.classList[2];
            target.classList.remove(importance);

            const swichedImportance = this.switchImportance(importance);
            target.classList.add(swichedImportance);
            window.importance = swichedImportance;
        });
    }

    static setEventListenerToAddTaskForm(addTaskForm) {
        addTaskForm.addEventListener('submit', e => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const tomato = new Tomato();
            const task = new Task(formData.taskName, 0, window.importance);
            tomato.addTask(task);
            addTaskForm.reset();
        });
    }

    static setEventListenerToTaskList(taskList) {
        taskList.addEventListener('click', ({ target }) => {

            if (target.classList.contains('pomodoro-tasks__task-button')) {
                const li = target.closest('li');
                li.children[3].classList.add('burger-popup_active');
            }
            else {
                const li = target.closest('li');
                li.children[3].classList.remove('burger-popup_active');
            }

            if (target.classList.contains('burger-popup__edit-button')) {
                alert('Редактировать');
            }

            if (target.classList.contains('burger-popup__delete-button')) {
                const modalOverlay = document.querySelector('.modal-overlay');
                modalOverlay.style.display = 'block';
            }

            if (target.classList.contains('pomodoro-tasks__task-text')) {
                this.clearChoosenTasks();

                target.classList.add('pomodoro-tasks__task-text_active');
                const windowPanelTitle = document.querySelector('.window__panel-title');
                windowPanelTitle.textContent = target.textContent;

                const tomato = new Tomato();
                tomato.activateTask(target.getAttribute('id'));
            }
        });
    }

    static setEventListenerToModalDelete(modalDelete) {
        console.log(modalDelete);
        modalDelete.addEventListener('click', ({ target }) => {
            if (target.classList.contains('modal-delete__delete-button')) {
                // const li = target.closest('li');
                // li.children[3].classList.add('burger-popup_active');
                alert('369');
            } else {
                alert('111');

            }
        });
    }
    static clearChoosenTasks() {
        const taskTexts = document.querySelectorAll('.pomodoro-tasks__task-text');
        taskTexts.forEach(item => {
            item.classList.remove('pomodoro-tasks__task-text_active');
        });
    }
}