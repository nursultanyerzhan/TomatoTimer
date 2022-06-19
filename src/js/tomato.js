import { Task } from './task.js';
import { RenderTomato } from './renderTomato.js';
import { ConrollerTomato } from './conrollerTomato.js';

export class Tomato {
    taskTimer;
    #period = 1;
    constructor(timeRemaining = 25, timePause = 5, timeBigPause = 15, tasks = []) {
        if (Tomato._instance) {
            return Tomato._instance;
        }
        this.timeRemaining = timeRemaining * 60;
        this.timePause = timePause * 60;
        this.timeBigPause = timeBigPause * 60;
        this.tasks = tasks;
        this.activeTask = null;
        Tomato._instance = this;
    }

    renderElements() {
        const { btnStart, btnStop, chooseImportance, addTaskForm, taskList, modalDelete } = RenderTomato.init();
        ConrollerTomato.setEventListenerToStart(btnStart);
        ConrollerTomato.setEventListenerToStop(btnStop);
        ConrollerTomato.setEventListenerToChooseImportance(chooseImportance);
        ConrollerTomato.setEventListenerToAddTaskForm(addTaskForm);
        ConrollerTomato.setEventListenerToTaskList(taskList);
        ConrollerTomato.setEventListenerToModalDelete(modalDelete);
    };


    addTask(task) {
        this.tasks.push(task);
        RenderTomato.addTask(task.getId(), task.getName(), 0, task.getImportance());
    }

    activateTask(taskId) {
        this.tasks.forEach(task => {
            if (task.getId() === +taskId) {
                this.activeTask = task;
                RenderTomato.activateTask(+taskId, task.getName());
            }
        });
    }

    showRemainingTime(timeRemaining, counter) {
        const remainedCount = timeRemaining - counter;
        const hours = Math.round(remainedCount / 3600);
        const minutes = Math.floor((remainedCount - hours * 3600) / 60);
        const seconds = Math.floor((remainedCount - hours * 3600 - minutes * 60));

        const getLikeTwoNumber = number => number < 10 ? `0${number}` : number;

        return `${getLikeTwoNumber(hours)}:${getLikeTwoNumber(minutes)}:${getLikeTwoNumber(seconds)}`;
    }

    runTimer() {
        if (this.activeTask !== null) {
            this.taskTimertimerId = setInterval(() => {
                if (this.timeRemaining > this.activeTask.getCounter()) {
                    this.activeTask.incrementCount();
                    RenderTomato.setWindowTimerText(this.showRemainingTime(this.timeRemaining, this.activeTask.getCounter()));
                } else {
                    clearInterval(this.taskTimertimerId);
                    this.activeTask.clearCounter();

                    let pause = 0;
                    if (this.#period % 4 === 0) {
                        pause = this.timeBigPause;
                        alert(`Большой перерыв, отдыхайте ${this.timeBigPause / 60} минут`);
                    } else {
                        pause = this.timePause;
                        alert(`Короткий перерыв, отдыхайте ${this.timePause / 60} минут`);
                    }

                    const timerPauseId = setInterval(() => {
                        if (pause > this.activeTask.getCounter()) {
                            this.activeTask.incrementCount();
                            RenderTomato.setWindowTimerText(this.showRemainingTime(pause, this.activeTask.getCounter()));
                            console.log(this.activeTask.getCounter());
                        } else {
                            clearInterval(timerPauseId);
                            this.activeTask.clearCounter();
                            alert(`Перерыв окончен, пора продолжить!`);
                            this.runTimer();
                        }
                    }, 1000);

                    this.#period++;
                }
            }, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.taskTimertimerId);
    }
}

// const task1 = new Task('первая задача', 4);
// const task2 = new Task(' задача 2', 3);
// const task3 = new Task(' задача 3', 2);
// const task4 = new Task(' задача 4', 1);
// const task5 = new Task(' задача 5');

// let tomato = new Tomato(10, 5, 15, [task1, task2, task3, task4]);
// tomato = new Tomato(2, 5, 15, [task1, task2, task3, task4]);
// tomato.addTask(task5);
// tomato.activateTask(task5.getId());

// console.log(tomato.tasks);
