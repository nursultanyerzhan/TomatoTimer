import { el, mount, setChildren } from '/node_modules/redom/dist/redom.es.js';
// import {task} from './task.js';

export class RenderTomato {
    constructor() {

    }

    static init() {
        const header = el('header', {},
            el('section', { className: 'header' },
                el('div', { className: 'container header__container' },
                    el('img', { className: 'header__logo', src: 'img/svg/noto_tomato.svg' }),
                    el('h1', { className: 'header__title' }, 'Tomato timer')
                ))
        );

        const btnStart = el('button', { className: 'button button-primary', id: 'btnStart' }, 'Старт');
        const btnStop = el('button', { className: 'button button-secondary', id: 'btnStop' }, 'Стоп');
        const chooseImportance = el('button', { className: 'button button-importance default', type: 'button', title: 'Указать важность', id: 'chooseImportance' });
        const addTaskForm = el('form', { className: 'task-form', action: 'submit' },
            el('input', { className: 'task-name input-primary', type: 'text', name: 'taskName', id: 'task-name', placeholder: 'название задачи', required: 'required'}),
            chooseImportance,
            el('button', { className: 'button button-primary task-form__add-button', type: 'submit' }, 'Добавить')
        );
        const taskList = el('ul', { className: 'pomodoro-tasks__quest-tasks' },);

        const main = el('main', {},
            el('section', { className: 'main' },
                el('div', { className: 'container main__container' },
                    el('div', { className: 'pomodoro-form window' },
                        el('div', { className: 'window__panel' },
                            el('p', { className: 'window__panel-title' }),
                            el('p', { className: 'window__panel-task-text' })),
                        el('div', { className: 'window__body' },
                            el('p', { className: 'window__timer-text' }),
                            el('div', { className: 'window__buttons' },
                                btnStart,
                                btnStop
                            )
                        ),
                        addTaskForm
                    ),
                    el('div', { className: 'pomodoro-tasks' },
                        el('p', { className: 'pomodoro-tasks__header-title' }, 'Инструкция:'),
                        el('ul', { className: 'pomodoro-tasks__quest-list' },
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Напишите название задачи чтобы её добавить'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Чтобы задачу активировать, выберите её из списка'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Запустите таймер'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Работайте пока таймер не прозвонит'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Сделайте короткий перерыв (5 минут)'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Продолжайте работать, пока задача не будет выполнена.'),
                            el('li', { className: 'pomodoro-tasks__list-item' }, 'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).')
                        ),
                        taskList,
                        el('p', { className: 'pomodoro-tasks__deadline-timer' }, '')
                    )
                )
            )
        );

        const modalDelete = el('div', { className: 'modal-overlay'},
                                el('div', {className: 'modal-delete'},
                                    el('p', { className: 'modal-delete__title'}, 'Удалить задачу?'),
                                    el('button', {className:'modal-delete__close-button'}),
                                    el('button', {className:'modal-delete__delete-button button-primary'}, 'Удалить'),
                                    el('button', {className:'modal-delete__cancel-button'}, 'Отмена')
                                )
                            )

        const body = el('div', {}, header, main, modalDelete);

        mount(document.body, body);

        return { btnStart, btnStop, chooseImportance, addTaskForm, taskList, modalDelete };
    }

    static addTask(id, name, countNumber, importance) {
        const editTask = el('button', { className: 'popup-button burger-popup__edit-button' }, 'Редактировать');
        const removeTask = el('button', { className: 'popup-button burger-popup__delete-button' }, 'Удалить');
        const li = el('li', { className: `pomodoro-tasks__list-task ${importance}` },
            el('span', { className: 'count-number' }, countNumber),
            el('button', { className: 'pomodoro-tasks__task-text', id: id, data_id: id }, name),
            el('button', { className: 'pomodoro-tasks__task-button' }),
            el('div', { className: 'burger-popup' }, editTask, removeTask)
        );

        const pomodoroTasksQuestTasks = document.querySelector('.pomodoro-tasks__quest-tasks');
        pomodoroTasksQuestTasks.append(li);
    }

    static activateTask(id, taskName) {
        const windowPanelTitle = document.querySelector('.window__panel-title');
        windowPanelTitle.textContent = taskName;
    }


    static setWindowTimerText (text) {
        const windowTimerText = document.querySelector('.window__timer-text');
        windowTimerText.textContent = text;
    } 

}

